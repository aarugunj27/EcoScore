import React, { useState } from "react";

const EcoScoreForm = () => {
  const [formData, setFormData] = useState({
    energyConsumption: "",
    transportation: "",
    carType: "",
    recyclingRate: "",
    waterUsage: "",
  });

  const [errors, setErrors] = useState({});
  const [ecoScore, setEcoScore] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.energyConsumption)
      newErrors.energyConsumption = "Energy consumption is required";
    if (!formData.transportation)
      newErrors.transportation = "Transportation type is required";
    if (formData.transportation === "car" && !formData.carType)
      newErrors.carType = "Car type is required";
    if (
      !formData.recyclingRate ||
      formData.recyclingRate < 0 ||
      formData.recyclingRate > 100
    ) {
      newErrors.recyclingRate = "Recycling rate should be between 0 and 100";
    }
    if (!formData.waterUsage) newErrors.waterUsage = "Water usage is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/calculate-eco-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        energyConsumption: formData.energyConsumption,
        transportation: formData.transportation,
        carType: formData.carType,
        recyclingRate: formData.recyclingRate,
        waterUsage: formData.waterUsage,
      }),
    });

    const data = await response.json();
    setEcoScore(data.ecoScore);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-green-500 dark:text-green-400 mb-4">
        Eco Score Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">
            Energy Consumption (kWh)
          </label>
          <input
            type="number"
            name="energyConsumption"
            value={formData.energyConsumption}
            onChange={handleChange}
            className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-100"
          />
          {errors.energyConsumption && (
            <p className="text-red-500 dark:text-red-400">
              {errors.energyConsumption}
            </p>
          )}
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">
            Transportation Type
          </label>
          <select
            name="transportation"
            value={formData.transportation}
            onChange={handleChange}
            className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-100"
          >
            <option value="">Select</option>
            <option value="car">Car</option>
            <option value="bicycle">Bicycle</option>
            <option value="public_transport">Public Transport</option>
          </select>
          {errors.transportation && (
            <p className="text-red-500 dark:text-red-400">
              {errors.transportation}
            </p>
          )}
        </div>

        {formData.transportation === "car" && (
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300">
              Type of Car
            </label>
            <select
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-100"
            >
              <option value="">Select</option>
              <option value="combustion">Combustion</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
            {errors.carType && (
              <p className="text-red-500 dark:text-red-400">{errors.carType}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">
            Waste Recycling Rate (%)
          </label>
          <input
            type="number"
            name="recyclingRate"
            value={formData.recyclingRate}
            onChange={handleChange}
            className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-100"
            min="0"
            max="100"
          />
          {errors.recyclingRate && (
            <p className="text-red-500 dark:text-red-400">
              {errors.recyclingRate}
            </p>
          )}
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">
            Water Usage (Liters)
          </label>
          <input
            type="number"
            name="waterUsage"
            value={formData.waterUsage}
            onChange={handleChange}
            className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-100"
          />
          {errors.waterUsage && (
            <p className="text-red-500 dark:text-red-400">
              {errors.waterUsage}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 dark:bg-green-600 text-white py-2 rounded"
        >
          Calculate Eco Score
        </button>
      </form>

      {ecoScore !== null && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded">
          <h3 className="text-xl font-semibold text-green-500 dark:text-green-400">
            Your Eco Score: {ecoScore}/100
          </h3>
        </div>
      )}
    </div>
  );
};

export default EcoScoreForm;
