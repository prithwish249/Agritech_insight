// src/components/Routes.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Weather from './Weather';
import CropPrediction from './CropPrediction';
import FertilizerPrediction from './FertilizerPrediction';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/crop-prediction" element={<CropPrediction />} />
        <Route path="/fertilizer-prediction" element={<FertilizerPrediction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
