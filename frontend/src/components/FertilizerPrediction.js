import React, { useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

const FertilizerPrediction = () => {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [potassium, setPotassium] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [fertilizerResult, setFertilizerResult] = useState("");
  const [error, setError] = useState("");
  const componentRef = useRef();
  const downloadButtonRef = useRef();

  const handleDownloadPDF = () => {
    const input = componentRef.current;
    const downloadButton = downloadButtonRef.current;

    // Hide the download button
    if (downloadButton) {
      downloadButton.style.display = "none";
    }

    const opt = {
      margin: 0.5,
      filename: "fertilizer_prediction.pdf",
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      html2canvas: { scale: 2 },
    };

    html2pdf()
      .from(input)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.text(0.5, 0.5, `Page ${i} of ${totalPages}`);
        }
      })
      .save()
      .finally(() => {
        // Restore the download button
        if (downloadButton) {
          downloadButton.style.display = "block";
        }
      });
  };

  const handleSoilTypeChange = (e) => {
    setSoilType(e.target.value);
  };

  const handleCropTypeChange = (e) => {
    setCropType(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (
        !temperature ||
        !humidity ||
        !moisture ||
        !soilType ||
        !cropType ||
        !nitrogen ||
        !potassium ||
        !phosphorus
      ) {
        setError("Please fill in all the fields.");
        return;
      }

      if (
        parseFloat(humidity) < 0 ||
        parseFloat(humidity) > 100 ||
        parseFloat(moisture) < 0 ||
        parseFloat(moisture) > 100 ||
        parseFloat(nitrogen) < 0 ||
        parseFloat(nitrogen) > 100 ||
        parseFloat(potassium) < 0 ||
        parseFloat(potassium) > 100 ||
        parseFloat(phosphorus) < 0 ||
        parseFloat(phosphorus) > 100
      ) {
        setError(
          "Be careful! Humidity, Moisture, Nitrogen, Potassium, and Phosphorus must have values between 0 and 100."
        );
        return;
      }

      if (
        isNaN(parseFloat(temperature)) ||
        isNaN(parseFloat(humidity)) ||
        isNaN(parseFloat(moisture)) ||
        isNaN(parseFloat(nitrogen)) ||
        isNaN(parseFloat(potassium)) ||
        isNaN(parseFloat(phosphorus))
      ) {
        setError("Please enter valid numbers.");
        return;
      }

      // If validation passes, construct data object
      const data = {
        Temparature: [parseFloat(temperature)],
        "Humidity ": [parseFloat(humidity)],
        Moisture: [parseFloat(moisture)],
        "Soil Type": [soilType],
        "Crop Type": [cropType],
        Nitrogen: [parseFloat(nitrogen)],
        Potassium: [parseFloat(potassium)],
        Phosphorous: [parseFloat(phosphorus)],
      };

      // Send request to the API
      const response = await axios.post(
        "https://predict-fertilizer-api.onrender.com/predict",
        data
      );

      // Set fertilizer result based on the response
      setFertilizerResult(response.data.predicted_label);

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
    <div className="container mx-auto p-4" ref={componentRef}>
      <h1 className="text-3xl font-mono font-semibold text-center mb-4">
        FERTILIZER PREDICTION
      </h1>
      <div className="bg-green-300 border border-blue-700 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4">
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
              className="w-full bg-white border border-black rounded-lg p-2 outline-none"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="humidity"
            >
              Humidity (%):
            </label>
            <input
              type="text"
              id="humidity"
              placeholder="Enter Humidity in %"
              className="w-full bg-white border border-black rounded-lg p-2 outline-none"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="moisture"
            >
              Moisture:
            </label>
            <input
              type="text"
              id="moisture"
              placeholder="Enter Moisture"
              className="w-full bg-white border border-black rounded-lg p-2 outline-none"
              value={moisture}
              onChange={(e) => setMoisture(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="soilType"
            >
              Soil Type:
            </label>
            <select
              id="soilType"
              className="w-full bg-white border border-black rounded-lg p-2 outline-none"
              value={soilType}
              onChange={handleSoilTypeChange}
            >
              <option value="">Select Soil Type</option>
              <option value="Loamy">Loamy</option>
              <option value="Sandy">Sandy</option>
              <option value="Clayey">Clayey</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="cropType"
            >
              Crop Type:
            </label>
            <select
              id="cropType"
              className="w-full bg-white border border-black rounded-lg p-2 outline-none overflow-y-auto max-h-40"
              value={cropType}
              onChange={handleCropTypeChange}
            >
              <option value="">Select Crop Type</option>
              <option value="Maize">Maize</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Cotton">Cotton</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Paddy">Paddy</option>
              <option value="Barley">Barley</option>
              <option value="Wheat">Wheat</option>
              <option value="Millets">Millets</option>
              <option value="Oil seeds">Oil seeds</option>
              <option value="Pulses">Pulses</option>
              <option value="Ground Nuts">Ground Nuts</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="nitrogen"
            >
              Nitrogen (%):
            </label>
            <input
              type="text"
              id="nitrogen"
              placeholder="Enter Nitrogen Percentage"
              className="w-full bg-white border border-black rounded-lg p-2 outline-none"
              value={nitrogen}
              onChange={(e) => setNitrogen(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="potassium"
            >
              Potassium (%):
            </label>
            <input
              type="text"
              id="potassium"
              placeholder="Enter Potassium Percentage"
              className="w-full bg-white border border-black rounded-lg p-2 outline-none"
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phosphorus"
            >
              Phosphorus (%):
            </label>
            <input
              type="text"
              id="phosphorus"
              placeholder="Enter Phosphorus Percentage"
              className="w-full bg-white border border-black rounded-lg p-2 outline-none"
              value={phosphorus}
              onChange={(e) => setPhosphorus(e.target.value)}
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
      {!error && fertilizerResult && (
        <>
          <div className="mt-4">
            <p className="text-center text-xl font-bold font-mono text-green-700">
              Recommended Fertilizer: {fertilizerResult}
            </p>
          </div>
          <div className="text-center" ref={downloadButtonRef}>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-500 text-white hover:bg-green-600  py-2 px-4 rounded mt-4"
            >
              Download as PDF
            </button>
          </div>
        </>
      )}
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

export default FertilizerPrediction;
