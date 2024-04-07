import React, { useState } from "react";
import axios from "axios";
const CropPrediction = () => {
  const [ph, setPh] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [hydration, setHydration] = useState("");
  const [rainfall, setRainfall] = useState(""); // New input state for rainfall
  const [temperature, setTemperature] = useState(""); // New input state for temperature
  const [cropResult, setCropResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      // Construct the JSON data object
      const data = {
        N: nitrogen,
        P: phosphorus,
        K: potassium,
        temperature: temperature,
        humidity: hydration,
        ph: ph,
        rainfall: rainfall,
      };

      // Make a POST request to the Flask API endpoint
      const response = await axios.post(
        "https://crop-prediction-api-h3sn.onrender.com/predict",
        data
      );

      // Set the predicted crop result received from the API response
      setCropResult(response.data.predicted_label);

      // Clear any previous errors
      setError("");
    } catch (error) {
      // Handle error and set error state
      setError(
        "An error occurred while processing your request. Please try again."
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl  font-mono font-semibold text-center  mb-4">
        CROP PREDICTION
      </h1>
      <div className="bg-blue-200   border border-blue-700 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="ph">
              pH Value:
            </label>
            <input
              type="text"
              id="ph"
              placeholder="Enter pH Value (1-14)"
              className="w-full border border-black bg-white rounded-lg p-2 outline-none"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="nitrogen"
            >
              Nitrogen Value:
            </label>
            <input
              type="text"
              id="nitrogen"
              placeholder="Enter Nitrogen Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={nitrogen}
              onChange={(e) => setNitrogen(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phosphorus"
            >
              Phosphorus Value:
            </label>
            <input
              type="text"
              id="phosphorus"
              placeholder="Enter Phosphorus Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={phosphorus}
              onChange={(e) => setPhosphorus(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="potassium"
            >
              Potassium Value:
            </label>
            <input
              type="text"
              id="potassium"
              placeholder="Enter Potassium Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="rainfall"
            >
              Rainfall (mm):
            </label>
            <input
              type="text"
              id="rainfall"
              placeholder="Enter Rainfall in mm"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="temperature"
            >
              Temperature (°C):
            </label>
            <input
              type="text"
              id="temperature"
              placeholder="Enter Temperature in °C"
              className="w-full bg-white  border border-black rounded-lg p-2 outline-none"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="hydration"
            >
              Hydration Value:
            </label>
            <input
              type="text"
              id="hydration"
              placeholder="Enter Hydration Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={hydration}
              onChange={(e) => setHydration(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <button
              className="bg-blue-500 border border-black hover:bg-blue-600 text-white p-3 rounded-lg w-[60%] sm:w-64 mx-auto block"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {!error && cropResult && (
        <div className="mt-4">
          <p className="text-center text-xl font-bold font-mono text-green-700">
            Recommended Crop:{" "}
            {cropResult.charAt(0).toUpperCase() + cropResult.slice(1)}
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
  );
};

export default CropPrediction;
