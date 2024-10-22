const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// POST endpoint to generate Eco Score
app.post("/generate-eco-score", (req, res) => {
  const { positiveActions, negativeActions } = req.body;

  const prompt = `
    Based on the following sustainable actions:
    Positive: ${positiveActions}.
    Negative: ${negativeActions}.
    Provide a score from 1-100 (100 being the most sustainable), and personalized tips on how the user can improve their sustainability.
  `;

  axios({
    url:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      process.env.GOOGLE_GEMINI_API_KEY,
    method: "post",
    data: {
      contents: [{ parts: [{ text: prompt }] }],
    },
  })
    .then((response) => {
      const rawResponse = response.data.candidates[0].content.parts[0].text;
      const cleanedResponse = rawResponse.replace(/##|\*\*/g, ""); // Clean symbols
      res.json({ scoreAndTips: cleanedResponse });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to generate Eco Score" });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
