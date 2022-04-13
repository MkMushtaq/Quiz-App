const mongoose = require("mongoose");

const responsesSchema = mongoose.Schema({
  num: [
    {
      type: Number,
    },
  ],
  questions: [
    {
      type: String,
    },
  ],
  choices: [
    {
      type: String,
    },
  ],
  // quizTaken: Date,
  // timeTaken: Number,
});

module.exports = mongoose.model("Responses", responsesSchema);
