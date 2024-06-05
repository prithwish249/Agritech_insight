import React, { useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

const DiseasePrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/predict",
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

  const handleDownload = () => {
    const element = resultRef.current;
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5], // top, right, bottom, left
      filename: "rice-disease-prediction.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  // Get cause and removal info based on prediction
  const { cause, removal } = getDiseaseInfo();

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 bg-blue-50 border border-black rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Rice-Disease Prediction</h2>
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
        <div
          ref={resultRef}
          className="p-4 bg-white border rounded-lg shadow-lg"
        >
          {!error && prediction && (
            <div className="mt-4">
              <p className="text-xl font-bold font-mono text-green-700">
                Predicted Rice-disease:{" "}
                <span className="text-black inline">{prediction}</span>
              </p>
            </div>
          )}

          {cause && removal && (
            <div className="mt-4">
              <h3 className="text-xl font-bold font-mono text-red-700">
                Cause: <span className="text-black inline">{cause}</span>
              </h3>
              <h3 className="text-xl font-bold font-mono text-blue-700 mt-4">
                Control Mechanism:{" "}
                <span className="text-black inline">{removal}</span>
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
        {!error && prediction && (
          <div className="mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleDownload}
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePrediction;
