import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CropPredictionForm from './CropPrediction';
import DiseasePrediction from './DiseasePrediction';
import Home from './Home'; 
import Weather from './Weather'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/crop-prediction" component={CropPredictionForm} />
        <Route path="/weather" component={Weather} />
        <Route exact path="/" component={Home} />
        <Route exact path="/disease-prediction" component={DiseasePrediction} />

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
