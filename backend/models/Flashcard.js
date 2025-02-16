const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    box: { type: Number, default: 1 }, // Leitner System box
    nextReview: { type: Date, default: Date.now }, // Next review date
    correctAnswers: { type: Number, default: 0 }, // Number of correct attempts
    wrongAnswers: { type: Number, default: 0 }, // Number of wrong attempts
    lastCorrectAnswer: { type: Date }, // Timestamp of last correct answer
    lastWrongAnswer: { type: Date }, // Timestamp of last wrong answer
  },
  { timestamps: true } // Auto adds "createdAt" & "updatedAt"
);

module.exports = mongoose.model("Flashcard", flashcardSchema);
