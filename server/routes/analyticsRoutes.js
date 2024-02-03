const express = require("express");
const Quiz = require("../models/quizModel");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.get("/analytics", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;

    const quizzes = await Quiz.find({ createdBy: userId }).select(
      "_id title createdAt impressions"
    );

    const quizzesWithActions = quizzes.map((quiz, index) => ({
      srNo: index + 1,
      quizId: quiz._id,
      title: quiz.title,
      createdAt: quiz.createdAt,
      impressions: quiz.impressions,
      actions: {
        edit: `/edit/${quiz._id}`,
        delete: `/delete/${quiz._id}`,
        share: `/share/${quiz._id}`,
      },
    }));

    res.status(200).json({
      quizzes: quizzesWithActions,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/quizzes/:id", authenticateUser, async (req, res) => {
  try {
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    await quiz.deleteOne();

    res.status(200).json({ message: "Quiz deleted successfully." });
  } catch (error) {
    console.error("Error deleting quiz:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/quizzes/:quizId", authenticateUser, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, impressions, questions } = req.body;

    const existingQuiz = await Quiz.findById(quizId);
    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    existingQuiz.title = title;
    existingQuiz.impressions = impressions;

    if (questions && Array.isArray(questions)) {
      existingQuiz.qna.questions = questions.map((newQuestion, index) => {
        const existingQuestion = existingQuiz.qna.questions[index] || {};
        return {
          ...existingQuestion,
          text: newQuestion.text || "",
          options: newQuestion.options || [],
        };
      });
    }

    const updatedQuiz = await existingQuiz.save();

    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
