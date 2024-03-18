import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=56a1ed2611bd3972271b413653c7bb8d`
            );

            if (!response.ok) {
              throw new Error("Weather data request failed");
            }

            const data = await response.json();

            if (
              !data.name ||
              !data.sys ||
              !data.weather ||
              !data.main ||
              !data.wind
            ) {
              throw new Error("Weather data structure is incomplete");
            }

            setWeatherData(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching or processing weather data:", error);
            setError("Failed to fetch weather data.");
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError("Failed to retrieve geolocation.");
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      setError("Geolocation is not supported in your browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="  min-h-screen flex items-center justify-center relative">
      <video
        autoPlay
        loop
        muted
        className="absolute opacity-30 top-0 left-0 w-full h-full object-cover "
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="bg-gray-200 m-[10px] border border-black p-6 rounded-lg  text-center">
        <h1 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-500 mb-4">
          Weather Information
        </h1>

        {loading ? (
          <p className="text-black text-lg">Loading weather data...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : weatherData ? (
          <div className="p-[10px]">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Location: {weatherData.name}
            </h2>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Country: {weatherData.sys.country}
            </h2>
            <ul className="list-disc">
              <li className="text-black font-semibold text-lg mb-2">
                Weather: {weatherData.weather[0].description}
              </li>
              <li className="text-black  font-semibold text-lg mb-2">
                Temperature: {(weatherData.main.temp - 273.15).toFixed(3)}°C
              </li>
              <li className="text-black font-semibold  text-lg mb-2">
                Humidity: {weatherData.main.humidity}%
              </li>
              <li className="text-black  font-semibold text-lg mb-2">
                Wind Speed: {(weatherData.wind.speed / 1000).toFixed(3)} Km/s
              </li>
              <li className="text-black font-semibold  text-lg mb-2">
                Probability of Rain:{" "}
                {weatherData.rain ? weatherData.rain["1h"] || 0 : 0} mm/hr
              </li>
              <li className="text-black  font-semibold text-lg mb-2">
                Probability of Storm:{" "}
                {weatherData.weather[0].main === "Thunderstorm" ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-red-500 text-lg">Failed to fetch weather data.</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
