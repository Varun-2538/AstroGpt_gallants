// TraditionalChart.jsx
import React from "react";
import PropTypes from "prop-types";


function TraditionalChart({ kundali }) {
  // If no kundali data, render nothing
  if (!kundali) return null;

  // Extract house_rashis and planet data
  const houseRashis = kundali.house_rashis; 
  const planetHousePositions = kundali.planet_house_positions || {};

  // Map planets to their houses
  const planetHouseMapping = {};
  Object.entries(planetHousePositions).forEach(([planet, data]) => {
    const house = data.house;
    if (!planetHouseMapping[house]) {
      planetHouseMapping[house] = [];
    }
    planetHouseMapping[house].push(planet);
  });

  // Coordinates for placing text in each house
  const houseCoordinates = {
    1: { x: "50%", y: "25%" },
    2: { x: "27%", y: "16%" },
    3: { x: "16%", y: "25%" },
    4: { x: "27%", y: "50%" },
    5: { x: "10%", y: "72%" },
    6: { x: "27%", y: "85%" },
    7: { x: "50%", y: "70%" },
    8: { x: "72%", y: "85%" },
    9: { x: "85%", y: "72%" },
    10: { x: "72%", y: "50%" },
    11: { x: "85%", y: "25%" },
    12: { x: "72%", y: "16%" },
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      {/* Outer Square */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        fill="none"
        stroke="black"
        strokeWidth="0.5"
      />
      {/* Diamond Inside */}
      <polygon
        points="50,5 95,50 50,95 5,50"
        fill="none"
        stroke="black"
        strokeWidth="0.5"
      />
      {/* Rotated Cross */}
      <line x1="5" y1="5" x2="95" y2="95" stroke="black" strokeWidth="0.5" />
      <line x1="5" y1="95" x2="95" y2="5" stroke="black" strokeWidth="0.5" />

      {/* House text and planet labels */}
      {Object.entries(houseCoordinates).map(([house, { x, y }]) => (
        <g key={house}>
          {/* Rashi name (small text, blue) */}
          <text
            x={x}
            y={`${parseFloat(y) - 4}%`} // shift up a bit
            textAnchor="middle"
            fontSize="1.5"
            fill="blue"
          >
            {houseRashis?.[house]}
          </text>

          {/* Planet names (larger text, black) */}
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="2.5"
            fill="black"
          >
            {planetHouseMapping[house]?.join(", ") || ""}
          </text>
        </g>
      ))}
    </svg>
  );
}

TraditionalChart.propTypes = {
  kundali: PropTypes.shape({
    house_rashis: PropTypes.object, // or a more specific shape
    planet_house_positions: PropTypes.objectOf(
      PropTypes.shape({
        house: PropTypes.number,
      })
    ),
  }),
};

export default TraditionalChart;
