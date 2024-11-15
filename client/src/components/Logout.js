import React from "react";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        alert("You have been logged out!");
        navigate("/"); // Redirect to the home or login page
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("Failed to log out. Please try again.");
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default Logout;
