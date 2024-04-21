// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from './components/Routes'; 
import './index.css'; 


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);






