import sys
import joblib
import numpy as np

# Load the trained model
model = joblib.load('python-scripts/eco_score_model.pkl')

# Read inputs from Node.js
energy_consumption = float(sys.argv[1])
transportation = int(sys.argv[2])
car_type = int(sys.argv[3])
recycling_rate = float(sys.argv[4])
water_usage = float(sys.argv[5])

# Prepare data for prediction
input_data = np.array([[energy_consumption, transportation, car_type, recycling_rate, water_usage]])

# Predict eco score
eco_score = model.predict(input_data)[0]

# Output the result
print(eco_score)
