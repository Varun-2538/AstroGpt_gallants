import React from "react";
import AstrologyForm from "./AstrologyForm";
import NavBar from "./Navbar";

const Homepage = () => {
  return (
    <>
      {/* Orange background for the whole section */}
      <div className="bg-orange-300 min-h-screen w-full flex flex-col">
        {/* Your NavBar at the top */}
        <NavBar />

        {/* Main content: 2 columns on medium screens and up */}
        <div className="mt-16 flex-1 grid grid-cols-1 md:grid-cols-2">
          {/* Left Column (Background image + text) */}
          <div className="flex items-center justify-center">
            <div
              className="
                bg-[url('src/assets/10411845-removebg-preview.png')]
                bg-contain bg-center bg-no-repeat
                w-[500px] h-[450px]
                flex flex-col items-center justify-center
              "
            >
              {/* Headings displayed over the background image */}
              <h1 className="text-4xl font-serif font-medium text-white mb-2">
                Lorem ipsum dolor sit
              </h1>
              <h2 className="text-2xl font-serif font-medium text-white">
                Lorem ipsum dolor
              </h2>
            </div>
          </div>

          {/* Right Column (AstrologyForm) */}
          <div className="flex items-center justify-center p-4">
            <AstrologyForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
