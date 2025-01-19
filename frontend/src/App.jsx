import { useState } from "react";
import Homepage from "./components/Homepage";
import TraditionalChart from "./components/TraditionalChart";
import Analysis from "./components/Analysis";

function App() {
  const [result, setResult] = useState(null); // Stores result from Homepage
  const [summaryText, setSummaryText] = useState(""); // Stores summary_text for Analysis

  // Split summaryText into structured paragraphs
  const formattedSummary = summaryText
    ? summaryText.split("\n").map((line, index) => (
        <p key={index} className="mb-2 text-gray-700">
          {line}
        </p>
      ))
    : null;

  // Copy to clipboard function
  const handleCopy = () => {
    if (summaryText) {
      navigator.clipboard.writeText(summaryText).then(() => {
        alert("Summary text copied to clipboard!");
      });
    }
  };

  return (
    <div className="bg-[#FBF5DD] min-h-screen w-full">
      {/* Pass setResult and setSummaryText to Homepage */}
      <Homepage setResult={setResult} setSummaryText={setSummaryText} />

      {/* Render Chart and Analysis Section */}
      {result && (
        <section id="chart" className="min-h-screen w-full px-8 py-12">
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
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {formattedSummary ? (
                    <>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Summary
                      </h3>
                      <div className="text-gray-600">{formattedSummary}</div>
                    </>
                  ) : (
                    <p className="text-gray-600">
                      No analysis available. Please fill out the form.
                    </p>
                  )}
                </div>
                {/* Copy Button */}
                {summaryText && (
                  <button
                    onClick={handleCopy}
                    className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg shadow-lg hover:bg-teal-700 transition-all"
                  >
                    Copy Analysis Summary
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Analysis Component */}
      <Analysis initialMessage={summaryText} />
    </div>
  );
}

export default App;
