import React from 'react';

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

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold animate__animated animate__fadeIn">
          Agritech Insight
        </h1>
        <div className="mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300">
          <p>
            Welcome to Agritech Insight, your trusted source for agricultural information and innovation.
          </p>
          <p>
            Our vision is to revolutionize the agricultural industry through technology and sustainable practices.
          </p>
          <p className="font-technical">
            Join us in shaping the future of farming!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
