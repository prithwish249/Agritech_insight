import React, { useState } from "react";
import axios from "axios";

const DiseasePrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data.predicted_class);
      setError(""); // Reset error state on success
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to predict disease. Please try again."); // Set error state on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 bg-blue-50  border border-black rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4"> Rice-Disease Prediction</h2>
        <div className="mb-4">
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2"
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 ml-2 rounded"
            onClick={handleSubmit}
            disabled={!selectedFile || loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
        {!error && prediction && (
          <div className="mt-4">
            <p className="text-center text-xl font-bold font-mono text-green-700">
              Recommended Crop: {prediction}
            </p>
          </div>
        )}

        {/* Render error message if there is an error */}
        {error && (
          <div className="mt-4">
            <p className="text-center font-mono font-bold text-red-500">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePrediction;
