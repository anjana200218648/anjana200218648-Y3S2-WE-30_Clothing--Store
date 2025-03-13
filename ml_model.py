import pandas as pd
import pickle
from statsmodels.tsa.arima.model import ARIMA

# 🔹 Load dataset
df = pd.read_csv("sales_data.csv")

# 🔹 Convert 'Date' to datetime & create 'Month' column
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df['Month'] = df['Date'].dt.to_period('M')  # Extract Year-Month

# 🔹 Create dummy 'Sales' column (You need real sales data)
df['Sales'] = 100  # Replace with actual sales data if available

# 🔹 Group by Month & calculate total sales
df = df.groupby('Month').sum(numeric_only=True)

# 🔹 Train ARIMA Model
model = ARIMA(df['Sales'], order=(5,1,0))  # Adjust (p,d,q) if needed
fitted_model = model.fit()

# 🔹 Save the trained model
with open("sales_forecast_model.pkl", "wb") as f:
    pickle.dump(fitted_model, f)

print("✅ Model trained & saved as 'sales_forecast_model.pkl'")

# 🔹 Predict next month's sales
forecast = fitted_model.forecast(steps=1)
print("🔮 Next Month Predicted Sales:", forecast[0])
