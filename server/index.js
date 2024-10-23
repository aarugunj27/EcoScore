const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Import the EcoScore route
const ecoScoreRoutes = require("./routes/ecoScore");

// Use the EcoScore route
app.use("/api", ecoScoreRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
