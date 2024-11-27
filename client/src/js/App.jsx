import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component
import Home from "./Home"; // Optional home component
import Connections from "./Connections"; // Import your main component
import ErrorPage from "./ErrorPage"; // Import the ErrorPage component
import Footer from "./Footer"; // Import the Footer component
import { ToastProvider } from "./ToastContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.documentElement.classList.add("dark"); // Add dark class
    }
  }, []);

  // Toggle dark mode and store preference
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newDarkMode = !prev;
      localStorage.setItem("darkMode", newDarkMode); // Save preference
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newDarkMode;
    });
  };

  return (
    <ToastProvider>
      <div className={`flex flex-col min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <Router>
          <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} /> {/* Add the Navbar here */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} /> {/* Home Route */}
              <Route path="/connections" element={<Connections />} /> {/* Main Page Route */}
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </main>
          <Footer /> {/* Add the Footer here */}
        </Router>
      </div>
    </ToastProvider>
  );
};

export default App;
