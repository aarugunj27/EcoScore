const express = require("express");
const router = express.Router();
const db = require("../models/db");
const jwt = require("jsonwebtoken");

// Calculate Eco Score
router.post("/calculate-eco-score", (req, res) => {
  try {
    const {
      energyConsumption = 0,
      transportation = "",
      carType = "",
      recyclingRate = 0,
      waterUsage = 0,
    } = req.body;

    let ecoScore = 0;

    // Energy Consumption
    const energyMax = 25;
    const energyScore = Math.max(0, energyMax - energyConsumption / 10);
    ecoScore += energyScore;

    // Transportation
    const transportMax = 25;
    if (transportation === "car") {
      ecoScore +=
        carType === "electric"
          ? transportMax
          : carType === "hybrid"
          ? transportMax * 0.75
          : transportMax * 0.5;
    } else if (transportation === "public_transport") {
      ecoScore += transportMax * 0.8;
    } else if (transportation === "bicycle") {
      ecoScore += transportMax;
    }

    // Recycling Rate
    const recyclingMax = 20;
    const recyclingScore = (Math.min(recyclingRate, 100) / 100) * recyclingMax;
    ecoScore += recyclingScore;

    // Water Usage
    const waterMax = 20;
    const waterScore = Math.max(0, waterMax - waterUsage / 10);
    ecoScore += waterScore;

    ecoScore = Math.min(ecoScore, 100);

    return res.json({ ecoScore: parseFloat(ecoScore.toFixed(2)) });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Save Eco Score
router.post("/save-eco-score", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userID; // This should contain the user ID from the token

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const { score } = req.body;
    const sql = "INSERT INTO eco_scores (user_id, score) VALUES (?, ?)";
    db.query(sql, [userId, score], (err) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(201).json({ message: "Eco score saved successfully" });
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Get Saved Eco Scores
router.get("/get-eco-scores", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userID;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    // Query the database for saved Eco Scores for the user
    const sql = "SELECT score, created_at FROM eco_scores WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(200).json({ ecoScores: results });
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
