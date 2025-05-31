# 🌿 Leaf Disease Detection

This project uses a **Convolutional Neural Network (CNN)** model built with **Keras** (served via a **Flask** backend) and a **React** frontend to detect plant leaf diseases from uploaded images.

---

## 🔧 Tech Stack

- **Frontend**: ReactJS  
- **Backend**: Flask (Python)  
- **Model**: Trained with Keras using TensorFlow backend  
- **UI Features**:  
  - Upload leaf image  
  - Predict disease type  
  - Show prediction confidence

---

## 🚀 How to Run the Project

### 📦 Backend (Flask API)

1. **Install required Python packages**:

    ```bash
    pip install -r requirements.txt
    ```

2. **Run the Flask server**:

    ```bash
    python main.py
    ```

> ✅ Ensure your trained model is located at:  
> `Training/model/Leaf Deases(96,88).h5`

---

### 💻 Frontend (React App)

1. **Navigate to the frontend folder**:

    ```bash
    cd frontend
    ```

2. **Install React dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

> React will run at `http://localhost:3000`  
> Flask backend should run at `http://localhost:5000`

---

## 📸 Sample UI

- Upload a leaf image
- Click “Upload & Predict”
- View the predicted disease name and confidence percentage

---

## ✅ Future Enhancements

- Add real-time webcam support
- Improve model accuracy
- Deploy the app to Render / Vercel / Heroku / AWS
- Add support for more plant species

---

