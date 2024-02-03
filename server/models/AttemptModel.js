const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  answers: [
    {
      questionId: String,
      selectedOption: {
        text: String, // Store the selected option text
        index: Number, // Store the selected option index
      },
    },
  ],
  timestamp: { type: Date, default: Date.now },
  // Add other relevant data
});

const AttemptModel = mongoose.model("Attempt", AttemptSchema);

module.exports = AttemptModel;
