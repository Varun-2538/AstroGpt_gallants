import React from "react";
import AstrologyForm from "./AstrologyForm";
import NavBar from "./Navbar";

const Homepage = ({ setResult }) => {
  return (
    <div className="bg-[#FBF5DD] min-h-screen w-full flex flex-col">
      <div
            className="
              absolute
              bg-[url('src/assets/10411845-removebg-preview.png')]
              bg-contain bg-center bg-no-repeat
              opacity-75
              w-[80%] h-[50%] md:w-[60%] md:h-[60%]
              mt-[-200px] ml-[-540px]
              lg:w-[50%] lg:h-[70%]
            "
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
      {/* NavBar */}
      <NavBar />

      
      {/* Main content */}
      <div className="mt-16 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 relative p-4">
        
        {/* Left Column (Background image + text) */}
        <div className="flex items-center justify-center relative">
          {/* Background image */}
          

          {/* Text */}
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-teal-700 mb-2">
              Lorem ipsum dolor sit
            </h1>
            <h2 className="text-xl md:text-2xl font-serif font-medium text-teal-700">
              Lorem ipsum dolor
            </h2>
          </div>
        </div>

        {/* Right Column (AstrologyForm) */}
        <div className="flex items-center justify-center p-4">
          {/* Pass setResult to AstrologyForm */}
          <AstrologyForm setResult={setResult} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
