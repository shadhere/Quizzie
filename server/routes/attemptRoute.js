const express = require("express");
const AttemptModel = require("../models/AttemptModel");
const Quiz = require("../models/quizModel");

const router = express.Router();

router.post("/attempts", async (req, res) => {
  const { quizId, answers } = req.body;

  try {
    const newAttempt = new AttemptModel({
      quizId: quizId,
      answers: answers,
    });

    const savedAttempt = await newAttempt.save();
    console.log("Attempt saved successfully:", savedAttempt);

    res.status(201).json(savedAttempt);
  } catch (error) {
    console.error("Error saving attempt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/questionwiseanalysis/:quizId", async (req, res) => {
  const { quizId } = req.params;

  try {
    const allAttempts = await AttemptModel.find({ quizId });

    if (!allAttempts || allAttempts.length === 0) {
      return res.status(404).json({ error: "No attempts found for the quiz" });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const questions = quiz.questions;

    if (!questions || !Array.isArray(questions)) {
      return res.status(500).json({ error: "Invalid quiz format" });
    }

    let totalAttempts = 0;
    let totalCorrectQuestions = 0;
    let totalIncorrectQuestions = 0;

    const analysisResult = [];

    questions.forEach((question, index) => {
      let totalAttemptsForQuestion = 0;
      let totalCorrectAttemptsForQuestion = 0;
      let totalIncorrectAttemptsForQuestion = 0;

      allAttempts.forEach((userAttempt) => {
        const userAnswerObj = userAttempt.answers.find(
          (answer) => answer.questionId.toString() === question._id.toString()
        );

        if (userAnswerObj) {
          const selectedOptionIndex = userAnswerObj.selectedOption
            ? userAnswerObj.selectedOption.index
            : -1;

          const correctOptionIndex = parseInt(question.correctOption);

          const isCorrect = selectedOptionIndex === correctOptionIndex;

          totalAttemptsForQuestion++;
          if (isCorrect) {
            totalCorrectAttemptsForQuestion++;
          } else {
            totalIncorrectAttemptsForQuestion++;
          }
        } else {
          console.error(
            "Answer not found for question:",
            question._id.toString()
          );
        }
      });

      analysisResult.push({
        questionId: question._id,
        text: question.text,
        totalAttempts: totalAttemptsForQuestion,
        totalCorrectQuestions: totalCorrectAttemptsForQuestion,
        totalIncorrectQuestions: totalIncorrectAttemptsForQuestion,
      });

      totalAttempts += totalAttemptsForQuestion;
      totalCorrectQuestions += totalCorrectAttemptsForQuestion;
      totalIncorrectQuestions += totalIncorrectAttemptsForQuestion;
    });

    res.status(200).json({
      totalAttempts,
      totalCorrectQuestions,
      totalIncorrectQuestions,
      questions: analysisResult,
    });
  } catch (error) {
    console.error("Error fetching question-wise analysis data:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

module.exports = router;
