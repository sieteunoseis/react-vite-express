import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Automate Builders</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300 transition duration-200">
            Home
          </Link>
          <Link to="/connections" className="hover:text-gray-300 transition duration-200">
            Add Connection
          </Link>
          <button onClick={toggleDarkMode} className="p-2 rounded hover:bg-gray-300 transition duration-200">
            {darkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-regular fa-moon"></i>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
