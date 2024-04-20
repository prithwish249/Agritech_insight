import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", {
        email,
      });
      if (response.data.success) {
        setMessage("OTP sent successfully");
      } else {
        setMessage("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP");
    }
  };

  const handleLogin = async () => {
    
    if (!name.trim() || !email.trim() || !location.trim() || !otp.trim()) {
      setMessage("Please fill in all fields");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        name,
        location,
        otp,
      });
  
      
      if (response.data.success) {
        setIsLoggedIn(true); 
      } else {
        setMessage(response.data.success); 
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Failed to login for Invalid OTP"); 
    }
  };
  

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue-100 p-8 rounded-xl shadow-lg border border-gray-400 w-full max-w-sm">
        <div className="flex items-center pl-6  justify-start font-bold  text-black ">
          <img
            src="agritech.jpg"
            alt="Agritech Icon"
            className="mr-2 rounded-full"
            style={{ height: "40px", width: "40px" }}
          />
          <h3 className="text-xl  text-black font-mono mb-2">
            Agritech Insight
          </h3>
        </div>
        <p className="text-md pl-[80px] text-green-600 font-mono mb-2">
          {" "}
          Please login ....{" "}
        </p>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 mb-1">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location, State name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700 mb-1">
            OTP:
          </label>
          <div className="flex">
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendOTP}
              className="bg-blue-500 ml-1 text-white px-4 py-2 rounded"
            >
              Send OTP
            </button>
          </div>
        </div>
        <div className="mb-4">
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </div>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
