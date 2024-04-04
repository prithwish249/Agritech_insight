import React, { useState } from "react";

const DiseasePrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "YOUR_API_KEY"; // Replace with your Clarifai API key

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlePrediction = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("https://your-api-url.com/predict-disease", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to predict disease.");
      }

      const data = await response.json();

      if (data && data.outputs && data.outputs.length > 0) {
        const concepts = data.outputs[0].data.concepts;
        if (concepts && concepts.length > 0) {
          const topPrediction = concepts[0];
          setDiseaseResult(
            `Disease: ${
              topPrediction.name
            } (Confidence: ${topPrediction.value.toFixed(2)})`
          );
        }
      } else {
        setDiseaseResult("No prediction result.");
      }
    } catch (error) {
      console.error("Error predicting disease:", error);
      setDiseaseResult("Failed to predict disease.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-200 h-[645px] flex items-center justify-center ">
      <div className="bg-white p-6 border-2 border-green-500 rounded-lg shadow-lg w-[80%] max-w-md">
        <h2 className="lg:text-2xl md:text-2xl sm:text-xl xl:text-2xl font-semibold mb-4 text-center">
          Plant Disease Prediction
        </h2>
        <input
          type="file"
          accept=".jpg"
          onChange={handleFileInputChange}
          className="w-full xl:pl-[100px] lg:pl-[100px] md:pl-[70px] sm:pl-[70px] min-pl-[60px] mb-4"
        />
        <button
          className="bg-blue-500 border border-black hover:bg-blue-600 text-white p-2 rounded-lg w-full"
          onClick={handlePrediction}
          disabled={isLoading}
        >
          {isLoading ? "Predicting..." : "Predict Disease"}
        </button>
        {diseaseResult && <p className="mt-4 text-center">{diseaseResult}</p>}
      </div>
    </div>
  );
};

export default DiseasePrediction;
