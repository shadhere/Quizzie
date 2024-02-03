const express = require("express");
const Quiz = require("../models/quizModel");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.get("/dashboard", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;

    const quizCount = await Quiz.countDocuments({ createdBy: userId });

    const totalQuestions = await Quiz.aggregate([
      { $unwind: "$questions" },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
    const questionCount =
      totalQuestions.length > 0 ? totalQuestions[0].count : 0;

    const totalImpressions = await Quiz.aggregate([
      { $group: { _id: null, count: { $sum: "$impressions" } } },
    ]);
    const impressionCount =
      totalImpressions.length > 0 ? totalImpressions[0].count : 0;

    const quizzes = await Quiz.find({ createdBy: userId }).select(
      "title impressions questions createdAt"
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
