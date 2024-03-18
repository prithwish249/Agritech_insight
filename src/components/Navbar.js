import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-blue-900 border border-b-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="text-white md:hidden mr-4"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
          <ul
            className={`md:hidden ${
              showMenu ? "block" : "hidden"
            } bg-white border border-black  absolute top-14 left-0 w-[150px] py-2  rounded-lg shadow-lg z-20`}
          >
            <li className="text-center">
              <Link
                to="/"
                className="block text-blue-700 font-semibold text-sm px-4 py-2 hover:bg-blue-100"
              >
                Home
              </Link>
            </li>
            <li className="text-center">
              <Link
                to="/weather"
                className="block text-blue-700 font-semibold text-sm px-4 py-2 hover:bg-blue-100"
              >
                Weather
              </Link>
            </li>
            <li className="text-center">
              <Link
                to="/crop-prediction"
                className="block text-blue-700 font-semibold text-sm px-6 py-2 hover:bg-blue-100"
              >
                Crop
              </Link>
            </li>
            <li className="text-center">
              <Link
                to="/disease-prediction"
                className="block text-blue-700 font-semibold text-sm px-4 py-2 hover:bg-blue-100"
              >
                Disease
              </Link>
            </li>
          </ul>
          <div className="hidden md:flex">
            <Link
              to="/"
              className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/weather"
              className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Weather
            </Link>
            <Link
              to="/crop-prediction"
              className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Crop
            </Link>
            <Link
              to="/disease-prediction"
              className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Disease
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white rounded-xl p-[0.3rem] flex items-center mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 outline-none"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              className="bg-white text-gray-700 p-2 rounded-xl ml-2"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
