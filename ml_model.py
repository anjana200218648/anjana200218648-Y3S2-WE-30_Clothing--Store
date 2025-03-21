import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import pickle

df = pd.read_csv("sales_data.csv")

# Fix date format issue
df['Date'] = pd.to_datetime(df['Date'], dayfirst=False)  # Ensure MM/DD/YYYY format

df['Month'] = df['Date'].dt.to_period('M')
df = df.groupby('Month').sum(numeric_only=True)

if df['Total Amount'].std() == 0:
    print("⚠ Not enough data variance!")
else:
    model = ARIMA(df['Total Amount'], order=(5,1,0))
    fitted_model = model.fit()
    with open("sales_forecast_model.pkl", "wb") as f:
        pickle.dump(fitted_model, f)
    forecast = fitted_model.forecast(steps=1)
    print("🔮 Next Month Prediction:", forecast[0])
