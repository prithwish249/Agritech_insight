import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Weather from "./Weather";
import CropPrediction from "./CropPrediction";
import FertilizerPrediction from "./FertilizerPrediction";
import DiseasePrediction from "./DiseasePrediction";
import Login from "./Login";


const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
    </BrowserRouter>
  );
};

export default AppRoutes;
