const express = require("express");
const { addFlashcard, getFlashcards, updateFlashcard, deleteFlashcard } = require("../controllers/flashcardController");
const auth = require("../config/auth");

const router = express.Router();

router.post("/flashcards", addFlashcard);
router.get("/flashcards",  getFlashcards);
router.put("/flashcards/:id", updateFlashcard);
router.delete("/flashcards/:id",  deleteFlashcard);

module.exports = router;
