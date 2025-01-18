import React, { useState } from "react";

function AstrologyForm({ setResult }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [latitude, setLatitude] = useState("28.6139");
  const [longitude, setLongitude] = useState("77.2090");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      dateOfBirth: dob,
      timeOfBirth: tob.length === 5 ? `${tob}:00` : tob, // Ensure HH:MM:SS format
      latitude,
      longitude,
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
      className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Astrology Analysis Form
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Date of Birth:
        </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Time of Birth:
        </label>
        <input
          type="time"
          value={tob}
          onChange={(e) => setTob(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Latitude:
        </label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Longitude:
        </label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded shadow hover:bg-indigo-700 focus:outline-none"
      >
        Get Analysis
      </button>
    </form>
  );
}

export default AstrologyForm;
