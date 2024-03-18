import React from "react";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute  inset-0 bg-black opacity-40"></div>
      <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  min-w-[250px] lg:w-[600px] md:w-[400px] sm:w-[300px] xs:w-[300px]">
        <div className="bg-white bg-opacity-50 p-8 rounded-2xl shadow-lg">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold animate__animated animate__fadeIn text-gray-900">
            Agritech Insight
          </h1>
          <div className="mt-4  flex-wrap  md:text-sm sm:text-sm lg:text-lg font-semibold text-gray-900">
            <p>
              Welcome to Agritech Insight, your trusted source for agricultural
              information and innovation. Our vision is to revolutionize the
              agricultural industry through technology and sustainable
              practices.
              <h1 className="text-black md:text-sm sm:text-sm lg:text-lg font-bold">
                Join us in shaping the future of farming ......
              </h1>
            </p>
            <div className="mt-4 flex justify-center items-center">
              <button className="flex items-center px-2 py-2 md:text-[12px] lg:text-[15px] bg-black text-white rounded-full shadow-md hover:bg-green-600 transition duration-300">
                <span className="pl-2">Contact Us</span>
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
                  className="w-6 h-6 pl-1 mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m10 8 4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
