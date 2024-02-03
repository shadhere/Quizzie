const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  answers: [
    {
      questionId: String,
      selectedOption: {
        text: String,
        index: Number,
      },
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

const AttemptModel = mongoose.model("Attempt", AttemptSchema);

module.exports = AttemptModel;
