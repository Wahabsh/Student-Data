import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure consistent styling

function StudentOptions() {
  const navigate = useNavigate();

  return (
    <div className="options-container">
      <h2>Select an Option</h2>
      <button onClick={() => navigate("/students")} className="option-button">
        Add Student Data
      </button>
      <button onClick={() => navigate("/student-list")} className="option-button">
        View Student Data
      </button>
    </div>
  );
}

export default StudentOptions;