const mongoose = require("mongoose");
const AttemptModel = require("./AttemptModel"); // Correct if the file is named AttemptModel.js and is in the same directory

const optionSchema = new mongoose.Schema({
  text: String,
  image: String,
});

const questionSchema = new mongoose.Schema({
  text: String,
  selectedQuestionType: String,
  options: [optionSchema],
  correctOption: String,
});

const quizSchema = new mongoose.Schema(
  {
    title: String,
    selectedQuizType: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    impressions: { type: Number, default: 0 }, // Add this field
    questions: [questionSchema],
    currentQuestion: Number,
    maxQuestions: Number,
    timer: Number,
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
