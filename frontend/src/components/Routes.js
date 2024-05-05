import React, { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Weather from "./Weather";
import CropPrediction from "./CropPrediction";
import FertilizerPrediction from "./FertilizerPrediction";
import DiseasePrediction from "./DiseasePrediction";
import Login from "./Login";



const SuccessMessage = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000); // Hide message after 3 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`success-card ${show ? "show" : ""}`}>
      <div className="success-content">
        <p className="message">Successfully Logged In.</p>
        <div className="timer-bar"></div>
      </div>
      <style>{`
        .success-card {
          position: fixed;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 20px;
          max-width: 300px;
          width: 100%;
          text-align: center;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .success-card.show {
          opacity: 1;
        }
        .success-content {
          position: relative;
        }
        .message {
          color: black;
          font-weight: bold;
        }
        .timer-bar {
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #0FFF50; 
          animation: timer-animation 3s linear;
        }
        @keyframes timer-animation {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};





const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide message after 3 seconds
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {isLoggedIn && (
          <>
            <Route path="/weather" element={<Weather />} />
            <Route path="/crop-prediction" element={<CropPrediction />} />
            <Route
              path="/fertilizer-prediction"
              element={<FertilizerPrediction />}
            />
            <Route
              path="/disease-prediction"
              element={<DiseasePrediction />}
            />
          </>
        )}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} />}
        />
      </Routes>
      {!isLoggedIn && <Navigate to="/login" />}
      {showSuccessMessage && <SuccessMessage />}
    </BrowserRouter>
  );
};

export default AppRoutes;
