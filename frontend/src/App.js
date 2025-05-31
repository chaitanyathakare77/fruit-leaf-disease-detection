import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Is the Flask server running?");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🌿 Leaf Disease Detection</h2>

        <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />

        {image && (
          <>
            <div style={styles.imageSection}>
              <h4>Uploaded Image:</h4>
              <img src={URL.createObjectURL(image)} alt="uploaded" style={styles.image} />
            </div>
            <button onClick={handleUpload} style={styles.button}>Upload & Predict</button>
          </>
        )}

        {result && (
          <div style={styles.resultSection}>
            <h3>Prediction Result:</h3>
            <p><strong>Disease:</strong> {result.label}</p>
            <p><strong>Confidence:</strong> {result.confidence.toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #dfe9f3, #ffffff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px 40px',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    maxWidth: 500,
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    marginBottom: 20,
    fontSize: '24px',
    color: '#2c3e50',
  },
  fileInput: {
    marginBottom: 20,
    fontSize: '16px',
  },
  button: {
    marginTop: 15,
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  imageSection: {
    marginTop: 10,
  },
  image: {
    marginTop: 10,
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },  
  resultSection: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
  },
};

export default App;
