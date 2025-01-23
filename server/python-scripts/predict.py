from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from werkzeug.utils import secure_filename

# Load your .h5 model
model = load_model('waste_classification_model.h5')

app = Flask(__name__)

# Allow CORS for your frontend domain
CORS(app, resources={r"/predict": {"origins": "https://ecoscore-oeyh.onrender.com"}})

# Define the class names
class_names = ['cardboard', 'glass', 'metal', 'organic', 'paper', 'plastic', 'trash']

# Set the upload folder to '/tmp' for Render or similar platforms
UPLOAD_FOLDER = '/tmp/uploads'  # Change this to '/tmp' or a similar location
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'https://ecoscore-oeyh.onrender.com'  # Your frontend URL
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        # Handle preflight request
        return jsonify({})

    try:
        # Check if an image file is included in the request
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Save the file securely to the defined folder
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Load and preprocess the image
        img = image.load_img(file_path, target_size=(150, 150))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict the class
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)
        predicted_prob = float(prediction[0][predicted_class]) * 100
        predicted_class_name = class_names[predicted_class]

        # Clean up the saved file
        os.remove(file_path)

        # Return the prediction result
        return jsonify({
            "predicted_class": predicted_class_name,
            "predicted_prob": predicted_prob
        })

    except Exception as e:
        # Handle any errors that occur during processing
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
