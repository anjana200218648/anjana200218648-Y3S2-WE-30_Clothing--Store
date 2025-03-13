from flask import Flask, render_template, request, jsonify
import pandas as pd
import os
from werkzeug.utils import secure_filename
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

DB_FILE = 'sales_data.csv'
if not os.path.exists(DB_FILE):
    pd.DataFrame(columns=['Month', 'Sales']).to_csv(DB_FILE, index=False)

# 🔹 Serve the frontend
@app.route('/')
def home():
    return render_template('index.html')

# 🔹 Function to Train ARIMA Model
def train_arima_model(data):
    data['Month'] = pd.date_range(start='1/1/2020', periods=len(data), freq='M')
    data.set_index('Month', inplace=True)
    model = ARIMA(data['Sales'], order=(5,1,0))  
    fitted_model = model.fit()
    forecast = fitted_model.forecast(steps=1)
    return forecast[0]

# 🔹 Upload CSV and Process Data
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
        if 'Sales' not in df_new.columns:
            return jsonify({'error': 'CSV must contain a Sales column'}), 400
        
        df_existing = pd.read_csv(DB_FILE)
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_csv(DB_FILE, index=False)  

        prediction = train_arima_model(df_combined)
        return jsonify({'prediction': prediction, 'message': 'File uploaded successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
