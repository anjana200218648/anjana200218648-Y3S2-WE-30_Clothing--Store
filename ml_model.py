import pandas as pd
import pickle
from statsmodels.tsa.arima.model import ARIMA

# 🔹 Load the dataset
df = pd.read_csv("sales_data.csv")

# 🔹 Convert Month to datetime & set as index
df['Month'] = pd.to_datetime(df['Month'])
df.set_index('Month', inplace=True)

# 🔹 Convert Sales column to numeric
df['Sales'] = pd.to_numeric(df['Sales'], errors='coerce')
df.dropna(inplace=True)  # Remove missing values

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
