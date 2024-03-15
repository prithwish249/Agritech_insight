import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-blue-700 p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link
            to="/"
            className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-full transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/weather"
            className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-full transition duration-300"
          >
            Weather
          </Link>
          <Link
            to="/crop-prediction"
            className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-full transition duration-300"
          >
            Crop 
          </Link>
          <Link
            to="/disease-prediction" // Use a route path that matches the actual route for Disease Prediction
            className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-full transition duration-300"
          >
            Disease 
          </Link>
        </div>
        <div className="bg-white rounded-full p-2 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 p-2 outline-none"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            className="bg-black text-white p-2 rounded-full ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
