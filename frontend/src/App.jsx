import { useState } from "react";
import Homepage from "./components/Homepage";
import TraditionalChart from "./components/TraditionalChart";
import Analysis from "./components/analysis";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="bg-[#FBF5DD] min-h-screen w-full">
      <Homepage setResult={setResult} />
      
      {result && (
        <section 
          id="chart" 
          className="min-h-screen w-full  px-8 py-12"
        >
          <div className="container mx-auto px-auto">
            <div className="flex flex-row md:flex-row gap-8 justify-between">
  {/* Traditional Chart - Left Side */}
  <div className="w-full md:w-1/2 bg-orange-200 rounded-2xl shadow-xl p-6">
    <TraditionalChart result={result} />
    <p className="font-serif text-black text-center">D1 Chart</p>
  </div>

  {/* Modern Interpretation - Right Side */}
  <div className="w-full md:w-1/2 bg-[#E6F7F5] rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-bold text-teal-700 mb-4">
      Your Personalized Analysis
    </h2>
    {/* Add your modern interpretation content here */}
    <div className="space-y-4">
      {/* Example content structure */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Planetary Positions
        </h3>
        <p className="text-gray-600">{/* Add your content here */}</p>
      </div>

      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Key Insights
        </h3>
        <p className="text-gray-600">{/* Add your content here */}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Recommendations
        </h3>
        <p className="text-gray-600">{/* Add your content here */}</p>
      </div>
    </div>
  </div>
</div>

          </div>
        </section>
        <Analysis />
      </div>
    </>
  );
}

export default App;