import React, { useState } from "react";
import axios from "axios";

const EcoScoreCalculator = () => {
  const [positiveActions, setPositiveActions] = useState("");
  const [negativeActions, setNegativeActions] = useState("");
  const [scoreAndTips, setScoreAndTips] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScore = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post("http://localhost:5000/generate-eco-score", {
      positiveActions,
      negativeActions,
    })
      .then((response) => {
        setScoreAndTips(response.data.scoreAndTips);
      })
      .catch((error) => {
        console.error("Error generating score", error);
        setScoreAndTips("Failed to generate score. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-center">
          Eco Score Calculator
        </h1>
        <form onSubmit={generateScore}>
          <div className="mb-5">
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-2">
              Positive Sustainable Actions
            </label>
            <textarea
              value={positiveActions}
              onChange={(e) => setPositiveActions(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 dark:bg-zinc-700 dark:text-zinc-100"
              placeholder="E.g., recycling, using renewable energy"
              rows="4"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-2">
              Negative Sustainable Actions
            </label>
            <textarea
              value={negativeActions}
              onChange={(e) => setNegativeActions(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 dark:bg-zinc-700 dark:text-zinc-100"
              placeholder="E.g., excessive water usage, driving a lot"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-zinc-700 dark:bg-zinc-600 text-white font-medium rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-500 transition-colors"
          >
            {loading ? "Calculating..." : "Get Eco Score"}
          </button>
        </form>
        {scoreAndTips && (
          <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-4">
              Your Eco Score and Tips:
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
              {scoreAndTips}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoScoreCalculator;
