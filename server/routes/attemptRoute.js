const express = require("express");
const AttemptModel = require("../models/AttemptModel");
const Quiz = require("../models/quizModel");

const router = express.Router();

// Endpoint for handling quiz attempts
router.post("/attempts", async (req, res) => {
  const { quizId, answers } = req.body;

  try {
    // Save the user attempt
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
    // Fetch all attempts for the specified quiz
    const allAttempts = await AttemptModel.find({ quizId });

    if (!allAttempts || allAttempts.length === 0) {
      return res.status(404).json({ error: "No attempts found for the quiz" });
    }

    // Fetch the corresponding quiz based on the quizId
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Extract questions and correct answers from the quiz
    const questions = quiz.questions;

    if (!questions || !Array.isArray(questions)) {
      return res.status(500).json({ error: "Invalid quiz format" });
    }

    // Initialize overall counters
    let totalAttempts = 0;
    let totalCorrectQuestions = 0;
    let totalIncorrectQuestions = 0;

    // Perform analysis logic based on the questions and answers from all attempts
    const analysisResult = [];

    questions.forEach((question, index) => {
      // Initialize counters for each question
      let totalAttemptsForQuestion = 0;
      let totalCorrectAttemptsForQuestion = 0;
      let totalIncorrectAttemptsForQuestion = 0;

      allAttempts.forEach((userAttempt) => {
        // Find the corresponding answer in the attempt
        const userAnswerObj = userAttempt.answers.find(
          (answer) => answer.questionId.toString() === question._id.toString()
        );

        if (userAnswerObj) {
          // Extract selected option index from user's answer
          const selectedOptionIndex = userAnswerObj.selectedOption
            ? userAnswerObj.selectedOption.index
            : -1;

          // Extract correct option index from the quiz
          const correctOptionIndex = parseInt(question.correctOption);

          // Check if the selected option index matches the correct answer
          const isCorrect = selectedOptionIndex === correctOptionIndex;

          // Update counters based on correctness
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

      // Add analysis result for the question
      analysisResult.push({
        questionId: question._id,
        text: question.text,
        totalAttempts: totalAttemptsForQuestion,
        totalCorrectQuestions: totalCorrectAttemptsForQuestion,
        totalIncorrectQuestions: totalIncorrectAttemptsForQuestion,
      });

      // Update overall counters
      totalAttempts += totalAttemptsForQuestion;
      totalCorrectQuestions += totalCorrectAttemptsForQuestion;
      totalIncorrectQuestions += totalIncorrectAttemptsForQuestion;
    });

    // Include the overall summary and analysis result in the response
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
