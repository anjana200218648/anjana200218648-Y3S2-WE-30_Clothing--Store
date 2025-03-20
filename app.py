from flask import Flask, request, jsonify, render_template
import pandas as pd
import os
import pickle
from werkzeug.utils import secure_filename
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

MODEL_FILE = "sales_forecast_model.pkl"
DATA_FILE = "sales_data.csv"

# 🔹 Load trained model if exists
def load_model():
    if os.path.exists(MODEL_FILE):
        with open(MODEL_FILE, "rb") as f:
            print("✅ Model Found & Loaded")  # Debugging message
            return pickle.load(f)
    print("❌ Model Not Found! Training new model...")  # Debugging message
    return None

model = load_model()

# 🔹 Train model function
def train_model():
    df = pd.read_csv(DATA_FILE)

    # 🔹 Convert 'Date' to datetime & create 'Month' column
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    df['Month'] = df['Date'].dt.to_period('M')

    # 🔹 Group by Month & calculate total sales
    df = df.groupby('Month').sum(numeric_only=True)

    # 🔹 Train ARIMA Model
    arima_model = ARIMA(df['Sales'], order=(5,1,0))  # Adjust (p,d,q) if needed
    fitted_model = arima_model.fit()

    # 🔹 Save trained model
    with open(MODEL_FILE, "wb") as f:
        pickle.dump(fitted_model, f)

    print("✅ Model Retrained Successfully!")
    return fitted_model

# 🔹 Home Route
@app.route('/')
def home():
    return render_template('upload.html')

# 🔹 File Upload & Model Retrain
@app.route('/upload', methods=['POST'])
def upload_file():
    global model  # Ensure we're using the correct global model

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

        df_existing = pd.read_csv(DATA_FILE)
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_csv(DATA_FILE, index=False)

        # 🔹 Retrain Model with Updated Data
        model = train_model()

        # 🔹 Predict next month's sales
        try:
            prediction = model.forecast(steps=1)[0]
            print("🔮 Prediction Successful:", prediction)  # Debugging message
        except Exception as e:
            print("❌ Prediction Error:", str(e))
            prediction = "Error generating prediction"

        return render_template('upload.html', message="File uploaded successfully!",
                               prediction=prediction, data=df_combined.to_dict(orient='records'))
    except Exception as e:
        return render_template('upload.html', error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
