import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import SignUp from "./component/signin/SignUp";
import Login from "./component/login/Login";
import Dashboard from "./component/dashboard/Dashboard";
import Flashcards from "./component/dashboard/Flashcards";

function App() {
  // 🌙 Manage Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 🔄 Apply dark mode class on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Router>
        <Toaster position="top-right" />
        
        {/* 🌙 Toggle Button */}
        <div className="p-4 flex justify-end">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white px-4 py-2 rounded dark:bg-gray-200 dark:text-black transition-all"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flashcard" element={<Flashcards />} />
          <Route path="/flashcard/:id" element={<Flashcards />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
