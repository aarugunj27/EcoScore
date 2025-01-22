from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
from werkzeug.utils import secure_filename
import gdown
import tempfile

# Flask app setup
app = Flask(__name__)
CORS(app)

# Direct download link for the model
MODEL_URL = "https://drive.google.com/uc?export=download&id=1AVvVZ_G7-Bao0RhKktTv9O42lexH3iat"
UPLOAD_FOLDER = 'uploads'
CLASS_NAMES = ['cardboard', 'glass', 'metal', 'organic', 'paper', 'plastic', 'trash']

# Set up upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Download and load the model
try:
    model_path = tempfile.NamedTemporaryFile(delete=False, suffix=".h5").name
    print("Downloading model from Google Drive...")
    gdown.download(MODEL_URL, model_path, quiet=False)
    model = load_model(model_path)
    print("Model loaded successfully.")
    os.remove(model_path)  # Clean up temp file
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/', methods=['POST'])
def predict():
    """
    Endpoint to predict the class of an uploaded waste image.
    """
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Securely save the uploaded file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Preprocess the image
        img = load_img(file_path, target_size=(150, 150))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict the class
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)
        predicted_prob = float(prediction[0][predicted_class]) * 100
        predicted_class_name = CLASS_NAMES[predicted_class]

        # Return the prediction result
        return jsonify({
            "predicted_class": predicted_class_name,
            "predicted_prob": predicted_prob
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        # Clean up the saved file
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    try:
        print("Starting Flask server...")
        app.run(port=5001)
    except Exception as e:
        print(f"Error starting server: {e}")
