from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)  # Enables CORS for all domains

# Load the trained model
model = load_model("Training/model/Leaf Deases(96,88).h5")

# Class labels
label_name = ['Apple scab', 'Apple Black rot', 'Apple Cedar apple rust', 'Apple healthy',
              'Cherry Powdery mildew', 'Cherry healthy', 'Corn Cercospora leaf spot Gray leaf spot',
              'Corn Common rust', 'Corn Northern Leaf Blight', 'Corn healthy',
              'Grape Black rot', 'Grape Esca', 'Grape Leaf blight', 'Grape healthy',
              'Peach Bacterial spot', 'Peach healthy', 'Pepper bell Bacterial spot',
              'Pepper bell healthy', 'Potato Early blight', 'Potato Late blight',
              'Potato healthy', 'Strawberry Leaf scorch', 'Strawberry healthy',
              'Tomato Bacterial spot', 'Tomato Early blight', 'Tomato Late blight',
              'Tomato Leaf Mold', 'Tomato Septoria leaf spot', 'Tomato Spider mites',
              'Tomato Target Spot', 'Tomato Yellow Leaf Curl Virus', 'Tomato mosaic virus', 'Tomato healthy']

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Read and preprocess the image
        image = Image.open(io.BytesIO(file.read())).convert('RGB')
        image = image.resize((150, 150))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        prediction = model.predict(img_array)[0]
        max_index = np.argmax(prediction)
        confidence = prediction[max_index] * 100

        return jsonify({
            "label": label_name[max_index],
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
