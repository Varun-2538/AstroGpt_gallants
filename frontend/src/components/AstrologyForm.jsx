import React, { useState } from "react";

function AstrologyForm({ setResult }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      dateOfBirth: dob,
      timeOfBirth: tob, // Supports HH:MM:SS format
      city,
      state,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data.kundali); // Pass result to App through setResult
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white bg-opacity-90 shadow-lg rounded-lg p-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-teal-700">
        🔮 Astrology Form
      </h2>
      <p className="text-center text-gray-600">
        Fill in your details to get personalized astrological analysis 🌟
      </p>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Name 📝:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Date of Birth 📅:
        </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Time of Birth ⏰ (HH:MM:SS):
        </label>
        <input
          type="time"
          step="1" // Enables seconds input
          value={tob}
          onChange={(e) => setTob(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 font-semibold mb-1">
            City 🏙️:
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter your city"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-semibold mb-1">
            State 🌆:
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter your state"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        🌟 Get Analysis
      </button>
    </form>
  );
}

export default AstrologyForm;
