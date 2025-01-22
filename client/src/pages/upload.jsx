import React, { useState } from "react";

const Model = process.env.REACT_APP_Model_URL;

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Handle form submission
  const handleFileUpload = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    if (!selectedImage) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${Model}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data); // Set the prediction in state
      console.log("Prediction result:", data);
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Upload an Image for Prediction
      </h2>
      <form onSubmit={handleFileUpload} className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="mb-4 p-2 border border-gray-300 rounded-md text-sm file:mr-3 file:px-4 file:py-2 file:bg-blue-500 file:text-white file:border-none file:cursor-pointer hover:file:bg-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Submit Image"}
        </button>
      </form>

      {prediction && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Prediction:
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-200">
            <strong>Class:</strong> {prediction.predicted_class || "N/A"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-200">
            <strong>Probability:</strong>{" "}
            {prediction.predicted_prob !== undefined
              ? prediction.predicted_prob.toFixed(2)
              : "N/A"}{" "}
            %
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
