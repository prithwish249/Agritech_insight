import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_yyi2cxg",
        "template_hs0bo2k",
        e.target,
        "B_wTZe0kI2Q9rYpZw"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="relative h-[645px]">
      <video
        autoPlay
        loop
        muted
        className={`absolute top-0 left-0 w-full h-full object-cover ${
          showForm ? "filter blur-lg brightness-50" : ""
        }`}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className={`${
          showForm ? "opacity-50" : "opacity-100"
        } absolute inset-0 `}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center min-w-[250px] lg:w-[600px] md:w-[400px] sm:w-[300px] xs:w-[300px]">
        <div className="bg-white bg-opacity-50 p-8 rounded-2xl shadow-lg">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold animate__animated animate__fadeIn text-gray-900">
            Agritech Insight
          </h1>
          <div className="mt-4 flex-wrap md:text-sm sm:text-sm lg:text-lg font-semibold text-gray-900">
            <p>
              Welcome to Agritech Insight, your trusted source for agricultural
              information and innovation. Our vision is to revolutionize the
              agricultural industry through technology and sustainable
              practices.
              <h1 className="text-blue-700 md:text-sm sm:text-sm lg:text-lg font-bold">
                Join us in shaping the future of farming ......
              </h1>
            </p>
            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={toggleForm}
                className="flex items-center px-2 py-2 md:text-[12px] lg:text-[15px] bg-black text-white rounded-full shadow-md hover:bg-green-600 transition duration-300"
              >
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
      {showForm && (
        <>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <button
                onClick={toggleForm}
                className="absolute top-0 right-0 m-4 text-gray-600"
              >
                {/* SVG Cross Button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <form
                netlify
                name="contact"
                onSubmit={sendEmail}
                className="lg:w-full md:w-full flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
              >
                <h2 className="text-green-500 font-mono sm:text-2xl text-xl mb-1 font-bold  title-font">
                  Contact Us
                </h2>
                <p className="font-mono text-blue-600 leading-relaxed mb-5">
                  Share your feedback and experience .....
                </p>
                <div className="relative mb-4">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm font-bold text-green-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-blue-100 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm font-bold text-green-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-blue-100  rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm font-bold text-green-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full bg-blue-100  rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
