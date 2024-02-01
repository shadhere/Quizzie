const express = require("express");
const Quiz = require("../models/quizModel");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.get("/dashboard", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get the number of quizzes created by the user
    const quizCount = await Quiz.countDocuments({ createdBy: userId });

    // Get the total number of questions across all quizzes
    const totalQuestions = await Quiz.aggregate([
      { $unwind: "$qna.questions" },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
    const questionCount =
      totalQuestions.length > 0 ? totalQuestions[0].count : 0;

    // Get the total number of impressions across all quizzes
    const totalImpressions = await Quiz.aggregate([
      { $group: { _id: null, count: { $sum: "$impressions" } } },
    ]);
    const impressionCount =
      totalImpressions.length > 0 ? totalImpressions[0].count : 0;

    // Get information about each quiz created by the user
    const quizzes = await Quiz.find({ createdBy: userId }).select(
      "title impressions qna.questions createdAt"
    );

    res.status(200).json({
      quizCount,
      totalQuestions: questionCount,
      totalImpressions: impressionCount,
      quizzes,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
