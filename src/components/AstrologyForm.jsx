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

    // Prepare the data to be sent to the server
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

      // Optionally handle the server’s response here (e.g., show a success message)
      console.log("Form data submitted successfully");
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label><br />
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dob">Date of Birth:</label><br />
        <input
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="tob">Time of Birth:</label><br />
        <input
          id="tob"
          type="time"
          value={tob}
          onChange={(e) => setTob(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Gender:</label><br />
        <label htmlFor="male">
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          Male
        </label>
        <br />
        <label htmlFor="female">
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
      </div>

      <div>
        <label htmlFor="state">State:</label><br />
        <input
          id="state"
          type="text"
          placeholder="Enter your state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="city">City:</label><br />
        <input
          id="city"
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <br />
      <button type="submit">Get Analysis</button>
    </form>
  );
}

export default AstrologyForm;
