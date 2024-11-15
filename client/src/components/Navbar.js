// Navbar.js
import React, { useState } from "react";
import Logout from "./Logout"; // Import the Logout component

const Navbar = ({ onShowEvent, onShowCoding, onShowVideo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black p-4 text-white fixed w-full top-0 shadow-lg">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Menu items for larger screens */}
        <div className="hidden md:flex space-x-4">
          <button onClick={onShowEvent} className="animated-button">Event Form</button>
          <button onClick={onShowCoding} className="animated-button">Online Coding</button>
          <button onClick={onShowVideo} className="animated-button">Live Video</button>
          <Logout /> {/* Include the Logout button */}
        </div>

        {/* Menu icon for smaller screens */}
        <button
          onClick={handleToggleMenu}
          className="md:hidden focus:outline-none"
        >
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Dropdown menu for smaller screens */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden bg-black p-4 space-y-2">
          <button onClick={onShowEvent} className="animated-button">Event Form</button>
          <button onClick={onShowCoding} className="animated-button">Online Coding</button>
          <button onClick={onShowVideo} className="animated-button">Live Video</button>
          <Logout /> {/* Include the Logout button in the dropdown */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
