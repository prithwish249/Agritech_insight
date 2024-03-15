import React, { useState } from 'react';

const DiseasePrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = 'YOUR_API_KEY'; // Replace with your Clarifai API key

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlePrediction = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('https://your-api-url.com/predict-disease', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to predict disease.');
      }

      const data = await response.json();

      if (data && data.outputs && data.outputs.length > 0) {
        const concepts = data.outputs[0].data.concepts;
        if (concepts && concepts.length > 0) {
          const topPrediction = concepts[0];
          setDiseaseResult(`Disease: ${topPrediction.name} (Confidence: ${topPrediction.value.toFixed(2)})`);
        }
      } else {
        setDiseaseResult('No prediction result.');
      }
    } catch (error) {
      console.error('Error predicting disease:', error);
      setDiseaseResult('Failed to predict disease.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Plant Disease Prediction</h2>
        <input type="file" accept=".jpg" onChange={handleFileInputChange} />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full mt-4"
          onClick={handlePrediction}
          disabled={isLoading}
        >
          {isLoading ? 'Predicting...' : 'Predict Disease'}
        </button>
        {diseaseResult && (
          <p className="mt-4">{diseaseResult}</p>
        )}
      </div>
    </div>
  );
};

export default DiseasePrediction;
