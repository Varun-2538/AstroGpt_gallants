import React, { useState } from "react";

function AstrologyForm() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      dateOfBirth: dob,
      timeOfBirth: tob,
      gender,
      state,
      city,
    };

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Form data submitted successfully");
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-8 font-serif">
      {/* Font is serif for everything inside this div */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-orange-200 h-128 rounded-lg border-2 border-orange-300 shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Astrology Analysis Form
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-1"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Gender Radio Buttons */}
        <div className="mb-4">
          <p className="text-gray-700 font-semibold mb-2">Gender:</p>
          <div className="flex items-center space-x-4">
            <label htmlFor="male" className="flex items-center space-x-2">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                required
                className="focus:ring-2 focus:ring-indigo-400"
              />
              <span>Male</span>
            </label>
            <label htmlFor="female" className="flex items-center space-x-2">
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
                className="focus:ring-2 focus:ring-indigo-400"
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Two-Column Layout for Date/Time (left) and State/City (right) on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Date of Birth + Time of Birth */}
          <div className="flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-gray-700 font-semibold mb-1"
              >
                Date of Birth:
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tob"
                className="block text-gray-700 font-semibold mb-1"
              >
                Time of Birth :
              </label>
              <input
                id="tob"
                type="time"
                step="1" // Allows seconds in many browsers
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Right Column: State + City */}
          <div className="flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-gray-700 font-semibold mb-1"
              >
                State:
              </label>
              <input
                id="state"
                type="text"
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray-700 font-semibold mb-1"
              >
                City:
              </label>
              <input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded shadow
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Get Analysis
        </button>
      </form>
    </div>
  );
}

export default AstrologyForm;
