from flask import Flask, request, jsonify, render_template, send_file
import pandas as pd
import os
import pickle
from werkzeug.utils import secure_filename
from statsmodels.tsa.arima.model import ARIMA
import io
import csv
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import matplotlib.pyplot as plt

# Initialize the Flask app
app = Flask(__name__)

# Define file upload folder and ensure it exists
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Ensure the sales_data.csv file exists (if not, create it)
if not os.path.exists("sales_data.csv"):
    pd.DataFrame(columns=["Date", "Sales", "Product Category"]).to_csv("sales_data.csv", index=False)

# Function to train and save the ARIMA model
def train_and_save_model():
    try:
        # Read the sales data CSV file
        df = pd.read_csv("sales_data.csv")
        
        # Parse the date column with dayfirst=True to handle DD/MM/YYYY format
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce', dayfirst=True)
        df['Month'] = df['Date'].dt.to_period('M')

        # Check if Sales or Total Amount exists and rename if needed
        if 'Sales' not in df.columns:
            if 'Total Amount' in df.columns:
                df.rename(columns={'Total Amount': 'Sales'}, inplace=True)
            else:
                raise ValueError("Data must contain either 'Sales' or 'Total Amount' column.")

        # Group by 'Month' and sum the sales
        df = df.groupby('Month').sum(numeric_only=True)

        # If not enough variance, return None
        if df['Sales'].nunique() < 2:
            print("⚠ Not enough data variance for training!")
            return None, 0

        # Train ARIMA Model
        model = ARIMA(df['Sales'], order=(2, 1, 1))  # Adjusted order
        fitted_model = model.fit()

        # Save the trained model
        with open("sales_forecast_model.pkl", "wb") as f:
            pickle.dump(fitted_model, f)

        # Predict next month's sales
        forecast = fitted_model.forecast(steps=1)
        prediction = round(forecast[0], 2)

        # Calculate the percentage change from the previous month
        last_month_sales = df['Sales'].iloc[-2] if len(df['Sales']) > 1 else 0
        percentage_change = ((prediction - last_month_sales) / last_month_sales) * 100 if last_month_sales > 0 else 0

        return prediction, percentage_change

    except Exception as e:
        print(f"Error training the model: {str(e)}")
        return None, 0

# Function to generate and save chart image (sales trend graph)
def generate_sales_chart(category_sales_data):
    months = [data['month'] for data in category_sales_data]
    sales = [data['sales'] for data in category_sales_data]

    plt.figure(figsize=(6, 4))
    plt.plot(months, sales, marker='o', color='b', linestyle='-', linewidth=2, markersize=6)
    plt.title('Sales Trend', fontsize=14)
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Sales', fontsize=12)
    plt.xticks(rotation=45)
    
    # Save the plot as an image
    chart_path = 'sales_trend_chart.png'
    plt.tight_layout()
    plt.savefig(chart_path)
    plt.close()
    
    return chart_path

# Route to generate and download the PDF report with chart
@app.route('/download_pdf_report/<category_name>')
def download_pdf_report(category_name):
    df_combined = pd.read_csv("sales_data.csv")
    category_data = df_combined[df_combined['Product Category'] == category_name]

    if category_data.empty:
        return jsonify({"error": "Category not found"}), 404

    # Prepare data for the PDF
    category_data['Date'] = pd.to_datetime(category_data['Date'], errors='coerce', dayfirst=True)
    category_data['Month'] = category_data['Date'].dt.to_period('M')
    category_sales = category_data.groupby('Month').sum(numeric_only=True)['Sales']
    
    # Convert to list of dictionaries for PDF generation
    sales_data_for_pdf = [{"month": str(month), "sales": sales} for month, sales in zip(category_sales.index, category_sales)]

    # Generate chart
    chart_path = generate_sales_chart(sales_data_for_pdf)

    # Generate and send PDF
    pdf_file = generate_pdf_report(category_name, sales_data_for_pdf, chart_path)
    return send_file(pdf_file, mimetype='application/pdf', as_attachment=True, download_name=f"{category_name}_sales_report.pdf")

# Function to generate PDF report with chart
def generate_pdf_report(category_name, data, chart_path):
    pdf_file = BytesIO()
    c = canvas.Canvas(pdf_file, pagesize=letter)
    
    # Set title
    c.setFont("Helvetica", 12)
    c.drawString(100, 750, f"Sales Report for Category: {category_name}")
    
    # Write data to PDF
    y_position = 730
    for row in data:
        c.drawString(100, y_position, f"Month: {row['month']} - Sales: {row['sales']}")
        y_position -= 20
    
    # Add chart image to the PDF
    c.drawImage(chart_path, 100, y_position - 200, width=400, height=200)

    c.showPage()
    c.save()
    
    # Move to the beginning of the BytesIO buffer
    pdf_file.seek(0)

    # Remove the chart image after adding it to the PDF
    os.remove(chart_path)

    return pdf_file

# Category page route
@app.route('/category/<category_name>')
def category_page(category_name):
    df_combined = pd.read_csv("sales_data.csv")
    category_data = df_combined[df_combined['Product Category'] == category_name]

    if category_data.empty:
        return render_template('category_page.html', error="Category not found")

    category_data['Date'] = pd.to_datetime(category_data['Date'], errors='coerce', dayfirst=True)
    category_data['Month'] = category_data['Date'].dt.to_period('M')
    category_sales = category_data.groupby('Month').sum(numeric_only=True)['Sales']

    category_sales_data = [{"month": str(month), "sales": sales} for month, sales in zip(category_sales.index, category_sales)]
    pie_data = category_sales_data

    return render_template('category_page.html', category_name=category_name, 
                           category_data=category_sales_data, pie_data=pie_data)

# Home route
@app.route('/')
def home():
    return render_template('upload.html')

# Upload route to handle file upload and retrain model
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
        # Load the uploaded file
        df_new = pd.read_csv(filepath)

        # Parse the date column with dayfirst=True to handle DD/MM/YYYY format
        df_new['Date'] = pd.to_datetime(df_new['Date'], errors='coerce', dayfirst=True)

        # Check for necessary columns and rename if needed
        if 'Sales' not in df_new.columns and 'Total Amount' in df_new.columns:
            df_new.rename(columns={'Total Amount': 'Sales'}, inplace=True)

        # Combine the uploaded data with existing data
        df_existing = pd.read_csv("sales_data.csv")
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_csv("sales_data.csv", index=False)

        # Calculate predictions for each product category
        product_categories = df_combined['Product Category'].unique()
        category_predictions = {}
        category_sales_data = {}  # To store sales data for each category

        for category in product_categories:
            # Filter the data for the current category
            category_data = df_combined[df_combined['Product Category'] == category]

            # Group by month and calculate total sales per month
            category_data['Date'] = pd.to_datetime(category_data['Date'], errors='coerce', dayfirst=True)
            category_data['Month'] = category_data['Date'].dt.to_period('M')
            category_sales = category_data.groupby('Month').sum(numeric_only=True)['Sales']

            # Save sales history for the category
            category_sales_data[category] = [{"month": str(month), "sales": sales} for month, sales in zip(category_sales.index, category_sales)]

            if category_sales.nunique() < 2:
                category_predictions[category] = "Not enough data"
            else:
                # Train ARIMA model and forecast the next month's sales
                model = ARIMA(category_sales, order=(2, 1, 1))
                fitted_model = model.fit()
                forecast = fitted_model.forecast(steps=1)
                prediction = round(forecast[0], 2)

                # Calculate the percentage change from the previous month
                last_month_sales = category_sales.iloc[-2] if len(category_sales) > 1 else 0
                percentage_change = ((prediction - last_month_sales) / last_month_sales) * 100 if last_month_sales > 0 else 0

                # Store the prediction and percentage change
                category_predictions[category] = (prediction, percentage_change)

        # Return the results to the template
        return render_template('upload.html', message="File uploaded and model retrained successfully!",
                               category_predictions=category_predictions, 
                               category_sales_data=category_sales_data, 
                               data=df_combined.to_dict(orient='records'))


    except Exception as e:
        return render_template('upload.html', error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
