import os
import json
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments
from datasets import load_dataset

# Указываем путь к папке с моделью и токенизатором
model_path = "path/meta-llama-Llama-3.2-3B-Instruct"

# Проверка наличия всех необходимых файлов
required_files = [
    "config.json",             # Конфигурация модели
    "pytorch_model.bin",       # Веса модели (PyTorch)
    "tokenizer_config.json",   # Конфигурация токенизатора
    "vocab.txt",               # Словарь токенов для токенизатора
    "merges.txt",              # Файл слияний для BPE (если используется)
    "special_tokens_map.json"  # Карта специальных токенов (опционально)
]

# Проверяем, что все нужные файлы на месте
for file_name in required_files:
    file_path = os.path.join(model_path, file_name)
    if not os.path.exists(file_path):
        print(f"Файл {file_name} отсутствует в директории {model_path}. Пожалуйста, добавьте его.")
    else:
        print(f"Файл {file_name} найден.")

# Загрузка конфигурации модели и токенизатора
try:
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(model_path)
    print("Модель и токенизатор успешно загружены.")
except Exception as e:
    print(f"Ошибка при загрузке модели или токенизатора: {e}")

# Указываем путь к данным для обучения
data_file_path = "training_data.txt"  # Этот файл должен содержать текст для обучения
if not os.path.exists(data_file_path):
    print(f"Файл с данными {data_file_path} не найден.")
else:
    print(f"Файл с данными {data_file_path} найден.")

# Подготовка данных для обучения
dataset = load_dataset("text", data_files=data_file_path)

# Параметры для обучения модели
training_args = TrainingArguments(
    output_dir="./llama_finetuned",
    evaluation_strategy="epoch",
    learning_rate=1e-5,
    per_device_train_batch_size=2,
    num_train_epochs=3,
    weight_decay=0.01,
    save_steps=500,
    save_total_limit=2,
)

# Настройка тренера
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset['train'],
    tokenizer=tokenizer,
)

# Запуск обучения
try:
    trainer.train()
    print("Обучение завершено.")
except Exception as e:
    print(f"Ошибка во время обучения: {e}")
