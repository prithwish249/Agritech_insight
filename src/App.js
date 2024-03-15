import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CropPredictionForm from './CropPrediction';
import DiseasePrediction from './DiseasePrediction';
import Home from './Home'; // Import your Home component
import Weather from './Weather'; // Import your Weather component
import './App.css'; // Import your CSS for responsive styles

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
          /* Example responsive styles for the main content */
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
