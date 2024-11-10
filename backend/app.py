from flask import Flask, request, jsonify, session, send_from_directory, abort
from flask_cors import CORS
import datetime
import json
from modules.ai import check_case
from modules.utils import generate_and_return_files
import docx
import PyPDF2
import os
import uuid

app = Flask(__name__, static_folder='dist')
CORS(app, supports_credentials=True, origins=["http://localhost:5174", "http://localhost:3000", "http://localhost:5173"])

# Путь для сохранения временных файлов
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/home/")
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/uploads/<path:filename>')
def download_report(filename):
    try:
        # Возвращаем файл с заголовком, указывающим, что это файл для скачивания
        return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)
    except FileNotFoundError:
        abort(404)

@app.route('/api/check-case', methods=['POST'])
def check_case_endpoint():
    if 'uc_file' not in request.files or 'ssts_file' not in request.files:
        return jsonify({"error": "Оба файла (UC и SSTS) должны быть загружены"}), 400
    
    # Генерируем уникальный ID для новой загрузки
    unique_id = str(uuid.uuid4())
    unique_folder = os.path.join(app.config['UPLOAD_FOLDER'], unique_id)
    
    print('unique_folder', unique_folder)
    
    os.makedirs(unique_folder, exist_ok=True)
    
    # Сохраняем файлы в уникальной папке
    uc_file = request.files['uc_file']
    ssts_file = request.files['ssts_file']
    
    uc_path = os.path.join(unique_folder, uc_file.filename)
    ssts_path = os.path.join(unique_folder, ssts_file.filename)
    
    uc_file.save(uc_path)
    ssts_file.save(ssts_path)
    
    try:
        # Передаем пути к файлам в функцию check_case
        res = check_case(uc_path, ssts_path, unique_folder)
        
        # Генерируем файлы для скачивания в уникальной папке
        docx_url, pdf_url = generate_and_return_files(unique_folder, res["full_text"])
        
        return jsonify({
            "docx_url": docx_url,
            "pdf_url": pdf_url,
            "csv_url": res["csv_url"],  # Извлекаем URL для Excel
            "full_text": res["full_text"]  # Извлекаем текст
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # finally:
    #     print('finally')
        # Удаляем файлы после обработки
        # if os.path.exists(uc_path):
        #     os.remove(uc_path)
        # if os.path.exists(ssts_path):
        #     os.remove(ssts_path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)