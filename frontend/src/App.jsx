import { useState } from "react";
import Homepage from "./components/Homepage";
import TraditionalChart from "./components/TraditionalChart";
import Analysis from "./components/analysis";

function App() {
  const [result, setResult] = useState(null); // State to hold Kundali result

  return (
    <>
      <div className="bg-white min-h-screen w-full">
        {/* Pass setResult to Homepage so AstrologyForm can update it */}
        <Homepage setResult={setResult} />
        <section className="min-h-screen w-full bg-orange-500">
          {/* Pass result to TraditionalChart */}
          {result ? (
            <TraditionalChart result={result} />
          ) : (
            <p className="text-white text-center pt-8">No data available</p>
          )}
        </section>
        <Analysis />
      </div>
    </>
  );
}

export default App;
