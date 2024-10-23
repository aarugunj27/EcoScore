const express = require("express");
const axios = require("axios");
const router = express.Router();

// POST endpoint to generate Eco Score
router.post("/generate-eco-score", (req, res) => {
  console.log("POST /api/generate-eco-score hit");
  console.log("Request body:", req.body); // Log the incoming request

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

module.exports = router;
