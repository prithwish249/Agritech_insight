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
    <nav className="bg-blue-900 border border-b-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center  justify-start text-white font-mono">
          <img
            src="agritech.jpg"
            alt="Agritech Icon"
            className="mr-2 rounded-full"
            style={{ height: "30px", width: "30px" }}
          />
          Agritech Insight
        </div>

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
                to="/fertilizer-prediction"
                className="block text-blue-700 font-semibold text-sm px-4 py-2 hover:bg-blue-100"
              >
                Fertilizer
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
          <div className="hidden md:flex pl-8">
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
              to="/fertilizer-prediction"
              className="text-white font-semibold text-lg md:mr-4 bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Fertilizer
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
          <div className="bg-white rounded-xl p-[0.2rem] flex items-center mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 outline-none"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              className="bg-green-400 border  text-gray-700 p-2 rounded-xl ml-2"
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
          {/* <Link to="/login" className="text-white mr-4">
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 50 50"
            >
              <path d="M 25 1 C 15.577 1 6.993 6.5725 3.125 15.1875 C 2.672 16.1945 3.117 17.3605 4.125 17.8125 C 5.132 18.2675 6.32825 17.8205 6.78125 16.8125 C 10.00525 9.6335 17.15 5 25 5 C 36.028 5 45 13.972 45 25 C 45 36.028 36.028 45 25 45 C 17.149 45 10.00525 40.3685 6.78125 33.1875 C 6.32925 32.1795 5.13 31.7375 4.125 32.1875 C 3.117 32.6405 2.672 33.8045 3.125 34.8125 C 6.994 43.4275 15.577 49 25 49 C 38.234 49 49 38.234 49 25 C 49 11.767 38.234 1 25 1 z M 25.96875 16 C 25.45675 16 24.9535 16.20275 24.5625 16.59375 C 23.7815 17.37475 23.7815 18.62525 24.5625 19.40625 L 28.125 23 L 2.96875 23 C 1.86475 23 0.96875 23.896 0.96875 25 C 0.96875 26.104 1.86475 27 2.96875 27 L 28.125 27 L 24.5625 30.59375 C 23.7815 31.37475 23.7815 32.62525 24.5625 33.40625 C 25.3435 34.18725 26.595 34.18725 27.375 33.40625 L 34.375 26.40625 C 35.156 25.62525 35.156 24.37475 34.375 23.59375 L 27.375 16.59375 C 26.985 16.20275 26.48075 16 25.96875 16 z" />
            </svg>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
