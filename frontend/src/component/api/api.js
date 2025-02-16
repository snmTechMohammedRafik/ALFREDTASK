import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
  return axios.post(`${API}/auth/register`, userData);
};

export const loginUser = async (userData) => {
    return axios.post(`${API}/auth/login`, userData);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    console.log(token)
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  console.log(getAuthHeaders())
  
//   export const getFlashcards = async () => {
//     return axios.get(`${API}/flashcards`, getAuthHeaders());
//   };
  
//   export const deleteFlashcard = async (id) => {
//     return axios.delete(`${API}/flashcards/${id}`, getAuthHeaders());
//   };

  // ✅ Create Flashcard
export const createFlashcard = async (data) => {
    return axios.post(`${API}/flashcards`, data, getAuthHeaders());
  };
  
  // ✅ Get All Flashcards
  export const getFlashcards = async () => {
    return axios.get(`${API}/flashcards`, getAuthHeaders());
  };
  
  // ✅ Update Flashcard (PUT)
  export const updateFlashcard = async (id, data) => {
    return axios.put(`${API}/flashcards/${id}`, data, getAuthHeaders());
  };
  
  // ✅ Delete Flashcard (DELETE)
  export const deleteFlashcard = async (id) => {
    return axios.delete(`${API}/flashcards/${id}`, getAuthHeaders());
  };