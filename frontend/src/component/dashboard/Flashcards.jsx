import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFlashcard, updateFlashcard, getFlashcards } from "../api/api";
import toast from "react-hot-toast";

const Flashcards = () => {
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const navigate = useNavigate();
  const { id } = useParams(); // Get flashcard ID from URL

  useEffect(() => {
    // If editing, fetch the existing flashcard data
    const fetchFlashcard = async () => {
      if (id) {
        try {
          const res = await getFlashcards();
          const flashcard = res.data.find(card => card._id === id);
          if (flashcard) {
            setFormData({ question: flashcard.question, answer: flashcard.answer });
          }
        } catch (error) {
          toast.error("Failed to load flashcard");
        }
      }
    };

    fetchFlashcard();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateFlashcard(id, formData);
        toast.success("Flashcard updated successfully!");
      } else {
        await createFlashcard(formData);
        toast.success("Flashcard created successfully!");
      }
      navigate("/dashboard"); // Redirect after success
    } catch (error) {
      toast.error("Failed to save flashcard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">{id ? "Edit Flashcard" : "Create Flashcard"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Question"
            className="w-full p-2 border rounded"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />
          <textarea
            placeholder="Answer"
            className="w-full p-2 border rounded"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Flashcards;
