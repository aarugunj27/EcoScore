const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

router.post("/calculate-eco-score", (req, res) => {
  const {
    energyConsumption,
    transportation,
    carType,
    recyclingRate,
    waterUsage,
  } = req.body;

  // Call Python script using spawn
  const pythonProcess = spawn("python", [
    "./python-scripts/predict.py", // Path to your Python script
    energyConsumption,
    transportation,
    carType,
    recyclingRate,
    waterUsage,
  ]);

  // Collect the output from the Python script
  pythonProcess.stdout.on("data", (data) => {
    // The output from the script will be in data (it's a Buffer object, so convert it to string)
    const ecoScore = data.toString().trim(); // Ensure no extra spaces or newlines
    res.json({ ecoScore: parseFloat(ecoScore) });
  });

  // Handle any errors
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send("Error processing the request");
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.log(`Python script exited with code ${code}`);
      res.status(500).send("Error processing the request");
    }
  });
});

module.exports = router;
