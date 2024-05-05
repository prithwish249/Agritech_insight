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
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to predict disease. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDiseaseInfo = () => {
    switch (prediction) {
      case "Bacterial Leaf Blight":
        return {
          cause: "Caused by bacteria.",
          removal: "Apply suitable bactericide and proper field management.",
        };
      case "Brown Spot":
        return {
          cause: "Fungal disease caused by Cochliobolus miyabeanus.",
          removal: "Apply fungicides and practice proper field sanitation.",
        };
      case "Leaf Blast":
        return {
          cause: "Caused by the fungus Pyricularia oryzae.",
          removal: "Use resistant varieties and apply fungicides.",
        };
      case "Leaf Scald":
        return {
          cause: "Caused by the bacteria Xanthomonas oryzae.",
          removal: "Use resistant varieties and apply bactericides.",
        };
      case "Narrow Brown Spot":
        return {
          cause: "Caused by Bipolaris oryzae.",
          removal: "Use fungicides and ensure proper field drainage.",
        };
      default:
        return {
          cause: "",
          removal: "",
        };
    }
  };

  // Get cause and removal info based on prediction
  const { cause, removal } = getDiseaseInfo();

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 bg-blue-50  border border-black rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2"> Rice-Disease Prediction</h2>
        <p className="text-md font-bold font-mono text-red-500 mb-4">
          Only jpeg image format is supported.
        </p>
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
              Predicted Rice-disease : <p className="text-black ">{prediction}</p>
            </p>
          </div>
        )}

        {cause && removal && (
          <div className="mt-4">
            <h3 className="text-xl font-bold font-mono text-red-700">
              Cause:<p className="text-black ">{cause}</p>
            </h3>
            <h3 className="text-xl font-bold font-mono text-blue-700 mt-4">
              Removal Steps:<p className="text-black ">{removal}</p>
            </h3>
          </div>
        )}

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
