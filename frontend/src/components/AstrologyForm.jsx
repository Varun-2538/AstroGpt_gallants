import React, { useState } from "react";

function AstrologyForm({ setResult }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // New hooks for the calculation result
  const [calculationResult, setCalculationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name,
      dateOfBirth: dob,
      timeOfBirth: tob,
      city,
      state,
    };

    try {
      // Original logic to post to the / route
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
      setResult(data.kundali); // Use the prop for parent updates

      // Additional logic for the /calculate route
      const calculateResponse = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!calculateResponse.ok) {
        throw new Error("Failed to fetch /calculate");
      }
      console.log("Data received from /calculate route:", calculateResponse);

      const calculateData = await calculateResponse.json();
      setCalculationResult(calculateData); // Store result in the new state
      console.log("Calculation result:", calculateData);

      // Smooth scroll to chart section
      const chartSection = document.getElementById("chart");
      if (chartSection) {
        chartSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCitySuggestions = async (input) => {
    if (input.trim() === "") {
      setCitySuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const suggestions = data.data.map((city) => ({
          cityName: city.name,
          stateName: city.region,
        }));
        setCitySuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);
    fetchCitySuggestions(input);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-teal-700 mb-4">
        🔮 Astrology Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name 📝:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Date of Birth 📅:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Time of Birth ⏰ (HH:MM:SS):
          </label>
          <input
            type="time"
            step="1"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">City 🏙:</label>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
          {citySuggestions.length > 0 && (
            <ul className="bg-white border rounded-lg mt-2 shadow-lg max-h-40 overflow-y-auto">
              {citySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                  onClick={() => {
                    setCity(suggestion.cityName);
                    setState(suggestion.stateName);
                    setCitySuggestions([]);
                  }}
                >
                  {suggestion.cityName}, {suggestion.stateName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">State 🌆:</label>
          <input
            type="text"
            value={state}
            onChange={handleStateChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-lg shadow-lg hover:bg-teal-700"
        >
          {isLoading ? "Calculating..." : "🌟 Get Analysis"}
        </button>
      </form>

      {/* Display additional calculation result */}
      {calculationResult && (
        <div id="chart" className="mt-8 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-teal-700 mb-2">
            Additional Analysis
          </h3>
          <pre className="whitespace-pre-wrap">{calculationResult.summary}</pre>
        </div>
      )}
    </div>
  );
}

export default AstrologyForm;
