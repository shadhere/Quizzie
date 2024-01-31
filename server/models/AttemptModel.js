const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  answers: [{ questionId: String, selectedOption: String }],
  timestamp: { type: Date, default: Date.now },
  // Add other relevant data
});

const AttemptModel = mongoose.model("Attempt", AttemptSchema);

module.exports = AttemptModel;
