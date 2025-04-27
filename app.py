from flask import Flask, request, jsonify, render_template
import pandas as pd
import os
import pickle
from werkzeug.utils import secure_filename
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


if not os.path.exists("sales_data.csv"):
    pd.DataFrame(columns=["Date", "Sales"]).to_csv("sales_data.csv", index=False)

 
def train_and_save_model():
    try:
        df = pd.read_csv("sales_data.csv")

         
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df['Month'] = df['Date'].dt.to_period('M')   

            
        if 'Sales' not in df.columns:
            if 'Total Amount' in df.columns:
                df.rename(columns={'Total Amount': 'Sales'}, inplace=True)
            else:
                raise ValueError("Data must contain either 'Sales' or 'Total Amount' column.")

        # 🔹 Group by 'Month' and calculate total sales
        df = df.groupby('Month').sum(numeric_only=True)

        # 🔹 Check for sufficient data variance
        if df['Sales'].nunique() < 2:
            print("⚠ Not enough data variance for training!")
            return None  # Return None instead of error

        # 🔹 Train ARIMA Model
        model = ARIMA(df['Sales'], order=(2, 1, 1))  # Adjusted order
        fitted_model = model.fit()

        # 🔹 Save the trained model
        with open("sales_forecast_model.pkl", "wb") as f:
            pickle.dump(fitted_model, f)

        print("✅ Model retrained and saved successfully!")

        # 🔹 Predict next month's sales
        forecast = fitted_model.forecast(steps=1)
        return round(forecast[0], 2)  # Round prediction
    except Exception as e:
        print(f"Error training the model: {str(e)}")
        return None  # Return None on failure

# 🔹 Home Route - Show Upload Page
@app.route('/')
def home():
    return render_template('upload.html')

# 🔹 File Upload API - Handles File Upload and Model Training
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

        # 🔹 Rename "Total Amount" -> "Sales" if needed
        if 'Sales' not in df_new.columns and 'Total Amount' in df_new.columns:
            df_new.rename(columns={'Total Amount': 'Sales'}, inplace=True)

        df_existing = pd.read_csv("sales_data.csv")

        # 🔹 Combine new data with existing data
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_csv("sales_data.csv", index=False)

        # 🔹 Retrain the model with the combined data
        prediction = train_and_save_model()

        return render_template('upload.html', message="File uploaded and model retrained successfully!",
                               prediction=prediction if prediction is not None else "Prediction not available due to insufficient data variance.",
                               data=df_combined.to_dict(orient='records'))
    except Exception as e:
        return render_template('upload.html', error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
