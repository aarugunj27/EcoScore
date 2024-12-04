import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib

# Placeholder data structure – replace with your actual dataset
data = {
    'energy_consumption': [200, 150, 300, 100, 250],
    'transportation': [0, 1, 1, 0, 2],  # Example encoding: 0 = public, 1 = car, 2 = bike
    'car_type': [1, 2, 1, 0, 2],  # Encoding: 0 = combustion, 1 = hybrid, 2 = electric
    'recycling_rate': [50, 60, 80, 70, 90],
    'water_usage': [1000, 800, 1200, 700, 900],
    'eco_score': [75, 82, 90, 70, 88]  # Placeholder target values for scoring
}

df = pd.DataFrame(data)

# Features and target
X = df.drop('eco_score', axis=1)
y = df['eco_score']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the random forest model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'eco_score_model.pkl')

# Evaluate the model
y_pred = model.predict(X_test)
print("Mean Squared Error:", mean_squared_error(y_test, y_pred))
