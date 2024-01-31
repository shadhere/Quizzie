// Example usage in routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizModel");
const authenticateUser = require("../middleware/authenticateUser");

// Create a new quiz
router.post("/quizzes", authenticateUser, async (req, res) => {
  try {
    const { quiz, qna } = req.body;
    // Ensure required fields are present
    if (!quiz || !quiz.title || !quiz.selectedQuizType || !qna) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request data" });
    }

    // Create a new Quiz instance with user association
    const newQuiz = new Quiz({
      title: quiz.title,
      selectedQuizType: quiz.selectedQuizType,
      createdBy: req.user._id, // Associating the user with the quiz
      qna: {
        questions: qna.questions,
        currentQuestion: qna.currentQuestion,
        maxQuestions: qna.maxQuestions,
        timer: qna.timer,
      },
    });

    // Save the new quiz to the database
    await newQuiz.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Quiz creation failed:", error.message);

    // Check for specific errors (e.g., validation errors)
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.errors,
      });
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get a specific quiz by ID
router.get("/quizzes/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    quiz.impressions += 1;
    await quiz.save();
    console.log(`Quiz ID: ${quizId}, Impressions: ${quiz.impressions}`);
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
