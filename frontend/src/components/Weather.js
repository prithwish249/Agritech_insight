import React, { useState, useEffect } from "react";
import { countries } from "countries-list"; // Import countries-list package

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to convert wind direction from degrees to direction code
  const getWindDirection = (degrees) => {
    const directions = [
      "North",
      "North-East",
      "East",
      "South-East",
      "South",
      "South-West",
      "West",
      "North-West",
    ];
    const index = Math.round((degrees % 360) / 45);
    return directions[index];
  };

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
    <div className="h-screen flex items-center justify-center relative">
      <video
        autoPlay
        loop
        muted
        className="absolute opacity-30 top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="bg-gray-200 m-[10px] border border-black px-6 pt-2  rounded-lg text-center">
        <h1 className="text-2xl  font-mono md:text-3xl lg:text-4xl font-semibold text-blue-500 mb-2">
          Weather Information
        </h1>
        <p className="text-md  font-mono md:text-md lg:text-lg font-semibold text-pink-500 mb-2">
          Hourly weather information...
        </p>

        {loading ? (
          <p className="text-green-500 font-mono  text-lg">
            Loading weather data...
          </p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : weatherData ? (
          <div className="p-[10px]">
            <h2 className="text-xl font-mono font-bold text-green-700 mb-2">
              Location: {weatherData.name}
            </h2>
            <h2 className="text-xl  font-mono font-bold text-green-700 ">
              Country: {countries[weatherData.sys.country]?.name || "Unknown"}
            </h2>
            <div className="flex  rounded-xl  justify-center items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </div>

            <ul className="list-disc text-left">
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Weather: {weatherData.weather[0].main}
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Temperature: {(weatherData.main.temp - 273.15).toFixed(3)}°C
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Wind Direction:{" "}
                {weatherData.wind && getWindDirection(weatherData.wind.deg)}
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(3)}
                °C
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Max Temperature:{" "}
                {(weatherData.main.temp_max - 273.15).toFixed(3)}°C
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Min Temperature:{" "}
                {(weatherData.main.temp_min - 273.15).toFixed(3)}°C
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Air pressure: {weatherData.main.pressure} mb
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Humidity: {weatherData.main.humidity}%
              </li>
              <li className="text-black font-mono font-semibold text-lg mb-2">
                Wind Speed: {(weatherData.wind.speed / 1000).toFixed(3)} Km/s
              </li>
              <li className="text-black  font-mono font-semibold text-lg mb-2">
                Probability of Rain:{" "}
                {weatherData.weather[0].main === "Rain"
                  ? weatherData.weather[0].description
                  : "No"}
              </li>
              <li className="text-black  font-mono font-semibold text-lg mb-2">
                Probability of Storm:{" "}
                {weatherData.weather[0].main === "Thunderstorm" ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-red-500 font-mono text-lg">
            Failed to fetch weather data.
          </p>
        )}
      </div>
    </div>
  );
};

export default Weather;
