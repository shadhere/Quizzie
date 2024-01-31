const express = require("express");
const AttemptModel = require("../models/AttemptModel"); // Adjust the path based on your project structure

const router = express.Router();

// Assume this route is for handling quiz attempts
router.post("/attempts", async (req, res) => {
  const { quizId, answers } = req.body;

  const newAttempt = new AttemptModel({
    quizId: quizId,
    answers: answers,
  });

  try {
    const savedAttempt = await newAttempt.save();
    console.log("Attempt saved successfully:", savedAttempt);
    res.status(201).json(savedAttempt);
  } catch (error) {
    console.error("Error saving attempt:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
