// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import CropPredictionForm from './CropPrediction';
import DiseasePrediction from './DiseasePrediction';
import Home from './Home';
import Weather from './Weather';
import './App.css';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute component
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} handleLogin={handleLogin} />} />

          {/* Protected routes */}
          {isLoggedIn && (
            <>
              <ProtectedRoute path="/crop-prediction" element={<CropPredictionForm />} />
              <ProtectedRoute path="/weather" element={<Weather />} />
              <ProtectedRoute exact path="/" element={<Home />} />
              <ProtectedRoute exact path="/disease-prediction" element={<DiseasePrediction />} />
            </>
          )}
        </Routes>

        {/* Add responsive styles for your components */}
        <style jsx>{`
          .content {
            padding: 20px;
          }

          @media (max-width: 768px) {
            .content {
              padding: 10px;
            }
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;
