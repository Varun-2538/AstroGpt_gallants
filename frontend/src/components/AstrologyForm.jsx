import React, { useState } from "react";

function AstrologyForm() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  // Time input includes seconds with `step="1"`
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
    <div className="min-h-screen flex items-center justify-center bg-blue-300 px-4 py-8">
      {/* Outer container for background and centering */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Date of Birth Field */}
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Time of Birth Field (with seconds) */}
        <div className="mb-4">
          <label
            htmlFor="tob"
            className="block text-gray-700 font-semibold mb-1"
          >
            Time of Birth (HH:MM:SS):
          </label>
          <input
            id="tob"
            type="time"
            step="1" // Enables seconds in many browsers
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

        {/* State Field */}
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* City Field */}
        <div className="mb-6">
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Get Analysis
        </button>
      </form>
    </div>
  );
}

export default AstrologyForm;
