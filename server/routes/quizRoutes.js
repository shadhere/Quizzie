const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizModel");
const authenticateUser = require("../middleware/authenticateUser");

router.post("/quizzes", authenticateUser, async (req, res) => {
  try {
    const { quiz, questions, timer, currentQuestion } = req.body;
    console.log("Object Data:", quiz);
    console.log("Array Data:", questions);
    console.log("Timer", timer);
    console.log("body", req.body);

    if (!quiz || !quiz.title || !quiz.selectedQuizType) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request data" });
    }

    const newQuiz = new Quiz({
      title: quiz.title,
      selectedQuizType: quiz.selectedQuizType,
      createdBy: req.user._id,
      questions: questions,
      currentQuestion: currentQuestion,
      maxQuestions: quiz.maxQuestions,
      timer: timer,
    });

    await newQuiz.save();

    res.status(201).json({ success: true, quiz: newQuiz });
  } catch (error) {
    console.error("Quiz creation failed:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/quizzes/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404);
    }

    quiz.impressions += 1;
    await quiz.save();
    console.log(`Quiz ID: ${quizId}, Impressions: ${quiz.impressions}`);
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
