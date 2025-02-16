import { useEffect, useState } from "react";
import { getFlashcards, deleteFlashcard, updateFlashcard } from "../api/api"; // API Calls
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await getFlashcards();
      setFlashcards(res.data);
    } catch (error) {
      toast.error("Failed to load flashcards");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await deleteFlashcard(id);
      setFlashcards(flashcards.filter((card) => card._id !== id));
      toast.success("Flashcard deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleAnswer = async (id, correct) => {
    try {
      await updateFlashcard(id, { correct });
      toast.success(correct ? "Moved to next box!" : "Moved back to Box 1!");
      fetchFlashcards(); // Refresh flashcards after update
    } catch {
      toast.error("Failed to update flashcard");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Flashcards</h1>
        <button
          onClick={() => navigate("/flashcard")}
          className="bg-green-500 text-white px-3 py-2 rounded">
          Create Flashcard
        </button>
      </div>

      {/* ✅ Flashcards as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {flashcards.map((card) => (
          <div key={card._id} className="bg-white shadow-md p-4 rounded">
            <h2 className="font-bold">{card.question}</h2>
            <p className="text-gray-600 mt-2">{card.answer}</p>

            {/* ✅ Leitner System Info */}
            <p className="text-blue-500 mt-2">📦 Box: {card.box}</p>
            <p className="text-gray-600 text-sm">
              🗓 Next Review: {new Date(card.nextReview).toLocaleDateString()}
            </p>

            {/* ✅ Answer Timestamps */}
            <p className="text-gray-600 text-sm">
              ✅ Last Correct:{" "}
              {card.lastCorrectAnswer
                ? new Date(card.lastCorrectAnswer).toLocaleString()
                : "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              ❌ Last Wrong:{" "}
              {card.lastWrongAnswer
                ? new Date(card.lastWrongAnswer).toLocaleString()
                : "N/A"}
            </p>

            {/* ✅ Answer Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleAnswer(card._id, true)}
                className="bg-green-500 text-white px-3 py-1 rounded">
                Got it Right ✅
              </button>
              <button
                onClick={() => handleAnswer(card._id, false)}
                className="bg-red-500 text-white px-3 py-1 rounded">
                Got it Wrong ❌
              </button>
            </div>

            {/* ✅ Edit & Delete Buttons */}
            <div className="flex justify-between mt-2">
              <button
                onClick={() => navigate(`/flashcard/${card._id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button
                onClick={() => handleDelete(card._id)}
                className="bg-gray-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>

            {/* ✅ Created & Updated Time */}
            <p className="text-gray-500 text-xs mt-2">
              ⏳ Created: {new Date(card.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-500 text-xs">
              🔄 Updated: {new Date(card.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
