const Flashcard = require("../models/Flashcard");

// Add a new flashcard
exports.addFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFlashcard = new Flashcard({ question, answer });
    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ message: "Error adding flashcard", error });
  }
};

// Get all flashcards
exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flashcards", error });
  }
};

// Update flashcard (Leitner System logic)
exports.updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { correct } = req.body;

    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    // Leitner System Logic
    if (correct) {
      flashcard.box = Math.min(flashcard.box + 1, 5); // Move to next box
      flashcard.correctAnswers += 1;
      flashcard.lastCorrectAnswer = new Date();
    } else {
      flashcard.box = 1; // Reset to Box 1
      flashcard.wrongAnswers += 1;
      flashcard.lastWrongAnswer = new Date();
    }

    // Set next review date based on Leitner intervals
    const intervals = [1, 2, 4, 7, 15]; // Days for each box
    flashcard.nextReview = new Date();
    flashcard.nextReview.setDate(flashcard.nextReview.getDate() + intervals[flashcard.box - 1]);

    await flashcard.save();
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: "Error updating flashcard", error });
  }
};

// Delete flashcard
exports.deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    await Flashcard.findByIdAndDelete(id);
    res.status(200).json({ message: "Flashcard deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flashcard", error });
  }
};
