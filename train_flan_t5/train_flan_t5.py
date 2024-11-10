import os
import pandas as pd
from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
from datasets import Dataset

# Загрузка данных
file_path = 'train_data.xlsx'
df = pd.read_excel(file_path)

# Форматирование данных для обучения
def format_data(row):
    return {
        "input_text": f"Requirement: {row['Requirement (HMI)']} Response: {row['Response (SSTS)']}",
        "target_text": f"Label: {row['Label']}"
    }

# Применение форматирования к каждому примеру
train_data = df.apply(format_data, axis=1)

# Создание DataFrame с колонками input_text и target_text
train_df = pd.DataFrame({
    "input_text": train_data.apply(lambda x: x["input_text"]),
    "target_text": train_data.apply(lambda x: x["target_text"])
})

# Конвертация DataFrame в Dataset, который подходит для использования с Hugging Face Trainer
train_dataset = Dataset.from_pandas(train_df)

# Загрузка токенизатора и модели Flan-T5
model_name = "google/flan-t5-base"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Функция для токенизации данных
def preprocess_data(examples):
    model_inputs = tokenizer(
        examples["input_text"],
        max_length=512,
        truncation=True,
        padding="max_length"
    )
    labels = tokenizer(
        examples["target_text"],
        max_length=10,
        truncation=True,
        padding="max_length"
    ).input_ids
    model_inputs["labels"] = labels
    return model_inputs

# Токенизация данных
train_dataset = train_dataset.map(preprocess_data, batched=True)

# Аргументы для обучения модели
training_args = TrainingArguments(
    output_dir="./flan_t5_finetuned",
    evaluation_strategy="epoch",
    learning_rate=3e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    save_steps=500,
    save_total_limit=2,
)

# Инициализация Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    tokenizer=tokenizer,
)

# Запуск обучения
trainer.train()
print("Обучение завершено.")
