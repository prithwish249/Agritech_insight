import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=56a1ed2611bd3972271b413653c7bb8d`
          );

          if (!response.ok) {
            throw new Error('Weather data request failed');
          }

          const data = await response.json();

          if (!data.name || !data.sys || !data.weather || !data.main || !data.wind) {
            throw new Error('Weather data structure is incomplete');
          }

          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching or processing weather data:', error);
          setError('Failed to fetch weather data.');
          setLoading(false);
        }
      }, (error) => {
        console.error('Error getting geolocation:', error);
        setError('Failed to retrieve geolocation.');
        setLoading(false);
      });
    } else {
      console.error('Geolocation is not available in this browser.');
      setError('Geolocation is not supported in your browser.');
      setLoading(false);
    }
  
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen flex items-center justify-center relative">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4">
          Weather Information
        </h1>
        {loading ? (
          <p className="text-gray-600 text-lg">Loading weather data...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : weatherData ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              Weather: {weatherData.weather[0].description}
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Temperature: {weatherData.main.temp}K
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            {/* New columns for probability of rain and storm */}
            <p className="text-gray-600 text-lg mb-2">
              Probability of Rain: {weatherData.rain ? weatherData.rain['1h'] || 0 : 0} mm/hr
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Probability of Storm: {weatherData.weather[0].main === 'Thunderstorm' ? 'Yes' : 'No'}
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-lg">Failed to fetch weather data.</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
