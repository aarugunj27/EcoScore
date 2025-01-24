import gc
import tracemalloc
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from werkzeug.utils import secure_filename

# Start memory tracking (you can enable this in production to monitor memory usage)
tracemalloc.start()

# Load your .h5 model
model = load_model('waste_classification_model.h5')

app = Flask(__name__)

# Allow CORS for your frontend domain
CORS(app)

# Define the class names
class_names = ['cardboard', 'glass', 'metal', 'organic', 'paper', 'plastic', 'trash']

# Set the upload folder to '/tmp' for Render or similar platforms
UPLOAD_FOLDER = '/tmp/uploads'  # Change this to '/tmp' or a similar location
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Limit maximum image size (in bytes)
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB limit, adjust as needed

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

        # Check the file size before saving to prevent overloading memory
        if len(file.read()) > MAX_FILE_SIZE:
            return jsonify({"error": "File is too large"}), 400
        file.seek(0)  # Reset the pointer after checking size

        # Save the file securely to the defined folder
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Load and preprocess the image (resize early to avoid large memory usage)
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

        # Manually run garbage collection to release memory
        gc.collect()

        # Return the prediction result
        return jsonify({
            "predicted_class": predicted_class_name,
            "predicted_prob": predicted_prob
        })

    except Exception as e:
        # Handle any errors that occur during processing
        if os.path.exists(file_path):
            os.remove(file_path)
        gc.collect()
        return jsonify({"error": str(e)}), 500

# Endpoint to monitor memory usage (optional)
@app.route('/memory', methods=['GET'])
def memory_usage():
    # Get memory usage stats
    current, peak = tracemalloc.get_traced_memory()
    return jsonify({
        "current_memory": current,
        "peak_memory": peak
    })

if __name__ == '__main__':
    app.run(port=5001)
