import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../firebase"; 
import "../App.css"; 

function StudentForm() {
  const [cmsId, setCmsId] = useState("");
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const studentData = {
      cmsId,
      name,
      section,
      timestamp: new Date(),
    };

    try {
      await addStudent(studentData); 
      alert("Student Added Successfully!");
      setCmsId("");
      setName("");
      setSection("");
    } catch (error) {
      alert("Error adding student. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="CMS ID"
          value={cmsId}
          onChange={(e) => setCmsId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>
      <button className="show-data-btn" onClick={() => navigate("/student-list")}>
        Show Data
      </button>
    </div>
  );
}

export default StudentForm;
