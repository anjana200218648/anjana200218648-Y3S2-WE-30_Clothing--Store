from flask import Flask, request, jsonify, render_template
import pandas as pd
import os
import pickle
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# 🔹 Load trained model
MODEL_FILE = "sales_forecast_model.pkl"
if os.path.exists(MODEL_FILE):
    with open(MODEL_FILE, "rb") as f:
        model = pickle.load(f)
else:
    model = None

# 🔹 Home Route - Show Upload Page
@app.route('/')
def home():
    return render_template('upload.html')

# 🔹 File Upload API
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        df_new = pd.read_csv(filepath)

        # 🔹 Fix: Convert "Total Amount" -> "Sales"
        if 'Sales' not in df_new.columns:
            if 'Total Amount' in df_new.columns:
                df_new.rename(columns={'Total Amount': 'Sales'}, inplace=True)
            else:
                return jsonify({'error': 'CSV must contain a Sales or Total Amount column'}), 400

        df_existing = pd.read_csv("sales_data.csv")
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_csv("sales_data.csv", index=False)  

        if model:
            prediction = model.forecast(steps=1)[0]
        else:
            prediction = "Model not trained yet"

        return render_template('upload.html', message="File uploaded successfully!",
                               prediction=prediction, data=df_combined.to_dict(orient='records'))
    except Exception as e:
        return render_template('upload.html', error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
