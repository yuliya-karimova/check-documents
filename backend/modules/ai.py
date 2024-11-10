import uvicorn
import requests
from fastapi import FastAPI 
# openai предоставляет только библиотеку для формирования запросов к языковым моделям
# ChatGPT не используется
from openai import OpenAI 
from typing import Optional, List, Dict, Any
import json
import docx
import os
from docx import Document
import pandas as pd
import re
from pydantic import BaseModel, Field
from typing import List, Optional
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
    
# DEFAULT_MODEL = 'llama-3.2-3b-instruct'
DEFAULT_MODEL = 'llama-3.2-3b-instruct@f16'
# DEFAULT_MODEL = 'llama-3.1-nemotron-70b-instruct-hf'

class Message(BaseModel):
    role: str
    content: str
    
# Payload example
class Payload(BaseModel):
    model: Optional[str] = None
    messages: List[Message]
    
  
# Функция `sent_to_ai` предназначена для отправки запроса в ЛОКАЛЬНО развернутую llm модель
# Данные никуда не отправляются и остаются в безопасности на вашем устройстве
# Она принимает данные в формате словаря (payload), которые содержат параметры для выполнения запроса к модели
# В результате выполнения запроса функция получает ответ от модели и возвращает его текстовое содержание
    
def sent_to_ai(payload: Payload):
    if not payload.model:
        payload.model = DEFAULT_MODEL
        
    payload = payload.dict()
    
    try:
        client = OpenAI(base_url="http://127.0.0.1:1234/v1/", api_key="lm-studio")
        response = client.chat.completions.create(**payload)
        print('response', response)
        
        return response.choices[0].message.content
    except Exception as e:
        # Обработка любой ошибки
        print(f"Произошла ошибка: {e}")
        
        
        
        
def load_document_from_file(file_path, prefix):
    # Extract the file name
    file_name = os.path.basename(file_path)
    # Extract the number from the file name
    match = re.search(rf'{prefix}(\d+)', file_name)
    if match:
        file_number = match.group(1)
    else:
        file_number = "Unknown"  # Default value if no number is found

    # Load the document
    doc = Document(file_path)
    paragraphs = [p.text for p in doc.paragraphs]  # Extract text from all paragraphs
    if paragraphs:
        first_line = paragraphs[0]
        name_match = re.search(r'\](.*)', first_line)
        if name_match:
            document_name = name_match.group(1).strip()  # Extract document name
        else:
            document_name = "No Name Found"  # Placeholder if name not found
    else:
        document_name = "Empty Document"  # Placeholder for empty documents

    full_text = '\n'.join(paragraphs)  # Combine text into one string
    data = [{'Number': file_number, 'Name': document_name, 'Text': full_text}]
    return pd.DataFrame(data)

def create_short_hmi_description(text_hmi):
    prompt = f"""
    Analyze the following detailed description of an HMI (Human-Machine Interface) and summarize it in a concise and clear format. Focus on the main functions, user interactions, and essential controls or indicators. The summary should be brief, straightforward, and formatted in a way that makes it easy for further verification or testing.

    Original HMI Description: "{text_hmi}"

    Please provide a short summary focusing on the key functionalities and interactions in the HMI. Avoid any additional explanations, and keep the language simple and direct.
    """
    messages = [Message(role="user", content=prompt)]
    payload = Payload(messages=messages)
    response = sent_to_ai(payload)
    return response.strip()  # Return the short description

keep_only_relevant_content_prompt_template = """
You are provided with a query and a set of retrieved documents. Your task is to filter out all non-relevant information that does not provide important details regarding the query. 

Query: {query}

Retrieved Documents: {retrieved_documents}

Your goal is to keep only the information that is directly relevant to the query, removing any extraneous details. You may remove parts of sentences or entire sentences that are not relevant to the query.

DO NOT ADD ANY NEW INFORMATION THAT IS NOT IN THE RETRIEVED DOCUMENTS.

Output only the filtered, relevant content.
"""

def create_relevant_content_prompt(short_hmi, text_stss):
    return keep_only_relevant_content_prompt_template.format(
        query=short_hmi,
        retrieved_documents=text_stss
    )

def keep_only_relevant_content(row):
    # Check if Text_SSTS data is available
    if pd.isna(row['Text_SSTS']):
        return ""

    # Create prompt to filter content
    prompt = create_relevant_content_prompt(row['Short HMI'], row['Text_SSTS'])
    messages = [Message(role="user", content=prompt)]
    payload = Payload(messages=messages)
    response = sent_to_ai(payload)

    # Return the filtered relevant content
    return response.strip()

def answer_question_from_context(row):
    # Create context and question for chain-of-thought reasoning
    context = f"""
    Short HMI: {row['Short HMI']}
    Requirements (Text_SSTS): {row['Text_SSTS']}

    """
    
    question = "Does the 'Short HMI' meet the requirements outlined in 'Text_SSTS'?"

    # Prompt with chain-of-thought examples
    prompt = f"""
    Examples of Chain-of-Thought Reasoning

    Example 1
    Context: Mary is taller than Jane. Jane is shorter than Tom. Tom is the same height as David.
    Question: Who is the tallest person?
    Reasoning Chain:
    The context tells us Mary is taller than Jane
    It also says Jane is shorter than Tom
    And Tom is the same height as David
    So the order from tallest to shortest is: Mary, Tom/David, Jane
    Therefore, Mary must be the tallest person

    Example 2
    Context: Harry was reading a book about magic spells. One spell allowed the caster to turn a person into an animal for a short time. Another spell could levitate objects.
    A third spell created a bright light at the end of the caster's wand.
    Question: Based on the context, if Harry cast these spells, what could he do?
    Reasoning Chain:
    The context describes three different magic spells
    The first spell allows turning a person into an animal temporarily
    The second spell can levitate or float objects
    The third spell creates a bright light
    If Harry cast these spells, he could turn someone into an animal for a while, make objects float, and create a bright light source
    So based on the context, if Harry cast these spells he could transform people, levitate things, and illuminate an area

    Now, use the following context and question to provide an answer with step-by-step reasoning:
    Context:
    {context}
    Question:
    {question}
    """

    # Prepare messages and send request to llm
    messages = [Message(role="user", content=prompt)]
    payload = Payload(messages=messages)
    response = sent_to_ai(payload)
    # Return the answer
    return response.strip()

def check_compliance(short_hmi, text_ssts, tokenizer, model):
    # Prepare the prompt for FLAN-T5
    prompt = f"Determine if the following description complies with the technical regulation. If it does not, specify the discrepancies. Answer 'Yes' or 'No' followed by the details. Description: '{short_hmi}' Technical Regulation: '{text_ssts}'"

    # Generate answer using FLAN-T5
    inputs = tokenizer.encode(prompt, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(inputs, max_length=256, num_beams=5, early_stopping=True)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print("Compliance Check:", answer)
    return answer

def summarize_discrepancies(description):
    prompt = f"""
    Given a detailed description of compliance discrepancies, summarize the key issues succinctly. Focus only on the main points of non-compliance and essential details that highlight what is wrong or missing. Please provide a concise summary.

    Full Description: "{description}"
    """
    messages = [Message(role="user", content=prompt)]
    payload = Payload(messages=messages)
    response = sent_to_ai(payload)
    return response.strip()

def create_description(row):
    prompt = f"""
    Given the detailed descriptions from three sources - HMI interface operations, system standards and specifications (STSS), and key discrepancies - synthesize a clear and concise summary that captures the essence of the functionality or process described. Focus on integrating information to provide a comprehensive yet succinct description that is useful for understanding the core functionalities and any critical issues.

    HMI Description: "{row['Text_HMI']}"
    STSS Description: "{row['Text_SSTS']}"
    Key Discrepancies: "{row['Differences']}"

    Please produce a summary that combines these details into a streamlined description of the main features and functions, highlighting any significant discrepancies where applicable. The summary should be concise, informative, and only include the most relevant information for clarity and utility.
    """
    messages = [Message(role="user", content=prompt)]
    payload = Payload(messages=messages)
    response = sent_to_ai(payload)
    return response.strip()

def create_is_grounded_prompt(context, answer):
    return is_grounded_on_facts_prompt_template.format(
        context=context,
        answer=answer
    )

is_grounded_on_facts_prompt_template = """
You are provided with a context and an answer. Your task is to determine if the answer is fully grounded in the information provided within the context. 

Context:
{context}

Answer:
{answer}

Please respond with "True" if the answer is completely based on the given context, without any unsupported assumptions or additional information, or "False" if the answer includes any hallucinations or unsupported claims.
"""

def is_answer_grounded_on_context(state):
    print("Checking if the answer is grounded in the facts...")
    context = state["context"]
    answer = state["answer"]

    # Create prompt for checking
    prompt = create_is_grounded_prompt(context, answer)
    messages = [Message(role="user", content=prompt)]
    payload = Payload(messages=messages)
    response = sent_to_ai(payload)

    # Check the response
    if response.strip().lower() == "true":
        print("The answer is grounded in the facts.")
        return "grounded on context"
    else:
        print("The answer is hallucination.")
        return "hallucination"

def send_to_llm_for_rating(row):
    # Check for applicability of requirements
    if pd.isna(row['Text_SSTS']):
        return "NA"  # Return "NA" if requirements are not applicable

    prompt = f"""
    Given comprehensive descriptions from multiple sources, analyze the text and classify it into one of the specific compliance categories based solely on the content provided. You should return ONLY the abbreviation of the compliance level without any additional text or explanation.

    Categories:
    - FC (Fully Compliant): The situation is perfect and nothing can be improved.
    - LC (Largely Compliant): Generally correct, but some minor improvements may be needed. No full review is necessary.
    - PC (Partially Compliant): There are major deviations. Significant improvements are needed and a subsequent review is required.
    - NC (Non-Compliant): The requirements are not met, necessitating a complete redo and re-review.
    - NA (Not Applicable): The situation described does not apply to the standards or requirements in question.

    HMI Description: "{row['Text_HMI']}"
    System Standards and Specifications (SSTS): "{row['Text_SSTS']}"
    Key Discrepancies: "{row['Requirement Compliance Answer']}"
    Differences: "{row['Differences']}"
    Integrated Description: "{row['Description']}"

    Based on the above information, please provide only the two-letter abbreviation (FC, LC, PC, NC, NA) that best describes the overall compliance level.
    """
    messages = [Message(role="user", content=prompt)]
    payload = Payload(messages=messages)
    response = sent_to_ai(payload)
    return response.strip()

        
        









def analyze_case(uc_path, ssts_path, user_folder):
      # Load documents from the files
    df_hmi = load_document_from_file(uc_path, 'UC-')
    df_stss = load_document_from_file(ssts_path, 'SSTS-')

    # Merge dataframes on 'Number'
    df = pd.merge(df_hmi, df_stss, on='Number', how='left', suffixes=('_HMI', '_SSTS'))

    # Drop 'Name_SSTS' column
    df = df.drop(columns=['Name_SSTS'])

    # Rename 'Name_HMI' to 'Name'
    df = df.rename(columns={'Name_HMI': 'Name'})

    print("Documents loaded and merged.")

    print("Creating short HMI descriptions...")
    # Create new column 'Short HMI'
    df['Short HMI'] = df['Text_HMI'].apply(create_short_hmi_description)
    print("Short HMI descriptions created.")

    print("Filtering relevant content from Text_SSTS...")
    # Update 'Filtered Text_SSTS' column
    df['Filtered Text_SSTS'] = df.apply(keep_only_relevant_content, axis=1)
    print("Relevant content filtered.")

    print("Answering questions from context...")
    # Create 'Requirement Compliance Answer' column
    df['Requirement Compliance Answer'] = df.apply(answer_question_from_context, axis=1)
    print("Questions answered.")

    # print("Loading FLAN-T5 model...")
    # Load FLAN-T5 model
    # model_name = "google/flan-t5-base"  # You can use 'google/flan-t5-large' if resources allow
    # tokenizer = AutoTokenizer.from_pretrained(model_name)
    # model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    # print("FLAN-T5 model loaded.")

    # print("Checking compliance using FLAN-T5...")
    # df['Compliance_Check'] = df.apply(lambda row: check_compliance(row['Short HMI'], row['Text_SSTS'], tokenizer, model), axis=1)
    # print("Compliance checked.")

    print("Summarizing discrepancies...")
    # Create 'Differences' column
    df['Differences'] = df['Requirement Compliance Answer'].apply(summarize_discrepancies)
    print("Discrepancies summarized.")

    print("Creating integrated descriptions...")
    # Create 'Description' column
    df['Description'] = df.apply(create_description, axis=1)
    print("Integrated descriptions created.")

    # Optionally, check if the answer is grounded in the context
    # df['Groundedness'] = df.apply(lambda row: is_answer_grounded_on_context({'context': row['Text_SSTS'], 'answer': row['Requirement Compliance Answer']}), axis=1)

    print("Sending data to llm for rating...")
    # Create 'Compliance Level' column
    df['Compliance Level'] = df.apply(send_to_llm_for_rating, axis=1)
    print("Data rated.")

    print("Saving submission to CSV...")
    submission = df[['Number', 'Name', 'Differences', 'Description', 'Compliance Level']]
    
    # submission.to_csv('submission.csv', index=False)
    # print("Submission saved to 'submission.csv'.")
    
    # Сохраняем CSV файл в указанной папке user_folder
    csv_path = os.path.join(user_folder, 'submission.csv')
    submission.to_csv(csv_path, index=False)
    print(f"Submission saved to '{csv_path}'.")

    print("Saving submission to Markdown file...")
    
    # Create Markdown content as per your request
    md_path = os.path.join(user_folder, 'submission.md')
    with open(md_path, 'w', encoding='utf-8') as f:
        for index, row in submission.iterrows():
            f.write(f"### Number:\n{row['Number']}\n\n")
            f.write(f"### Name:\n{row['Name']}\n\n")
            f.write(f"### Differences:\n{row['Differences']}\n\n")
            f.write(f"### Description:\n{row['Description']}\n\n")
            f.write(f"### Compliance Level:\n{row['Compliance Level']}\n\n")
            f.write("---\n\n")  # Separator between entries
    print(f"Submission saved to '{md_path}'.")

    print("Process completed successfully.")
    print(submission)
    
    # Чтение текста Markdown файла для возврата
    with open(md_path, 'r', encoding='utf-8') as f:
        markdown_text = f.read()
    
    return { "full_text": markdown_text, "csv_url": csv_path }
        
        
        
        
        
        
        
        
# def analyze_case(uc_path, ssts_path):
#     print('uc_path', uc_path)      
#     print('ssts_path', ssts_path)
    
#     prompt = 'hello'

#     # Создаем payload для llm
#     messages = [Message(role="user", content=prompt)]
#     payload = Payload(messages=messages)

#     # Отправляем запрос в llm и получаем ответ
#     response = sent_to_ai(payload.dict())

#     return { "full_text": response, "csv_url": './example.xlsx'}

        
        
        
        
        
        
        
        

def check_case(uc_path, ssts_path, user_folder):
    try:
        res = analyze_case(uc_path, ssts_path, user_folder)
    except Exception as e:
        res = {"response": f"error: {e}"}
    return res

