import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../App.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState(null); // 'update' or 'delete'
  const [inputData, setInputData] = useState({
    cmsId: "",
    name: "",
    section: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      // Find student by CMS ID
      const q = query(collection(db, "students"), where("cmsId", "==", inputData.cmsId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        alert("Student not found!");
        return;
      }

      const studentDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "students", studentDoc.id), {
        name: inputData.name,
        section: inputData.section
      });
      
      alert("Student updated successfully!");
      setAction(null);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Find student by CMS ID, name and section
      const q = query(
        collection(db, "students"),
        where("cmsId", "==", inputData.cmsId),
        where("name", "==", inputData.name),
        where("section", "==", inputData.section)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        alert("Student not found or details don't match!");
        return;
      }

      if (confirm(`Are you sure you want to delete ${inputData.name} (${inputData.cmsId})?`)) {
        const studentDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, "students", studentDoc.id));
        alert("Student deleted successfully!");
        setAction(null);
        fetchStudents();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Error deleting student: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Student List</h2>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn" onClick={() => setAction('update')}>Update Student</button>
        <button className="btn" onClick={() => setAction('delete')}>Delete Student</button>
        <button className="btn" onClick={() => navigate("/students")}>Add Student</button>
      </div>

      {/* Update/Delete Form */}
      {action && (
        <div className="form-container">
          <h3>{action === 'update' ? 'Update' : 'Delete'} Student</h3>
          <input
            type="text"
            name="cmsId"
            value={inputData.cmsId}
            onChange={handleInputChange}
            placeholder="CMS ID (e.g., 028-23-0860)"
            required
          />
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleInputChange}
            placeholder="Student Name"
            required
          />
          <input
            type="text"
            name="section"
            value={inputData.section}
            onChange={handleInputChange}
            placeholder="Section (e.g., C, O)"
            required
          />
          <div className="button-group">
            <button 
              className="btn" 
              onClick={action === 'update' ? handleUpdate : handleDelete}
            >
              {action === 'update' ? 'Update' : 'Delete'}
            </button>
            <button 
              className="btn" 
              onClick={() => {
                setAction(null);
                setInputData({ cmsId: "", name: "", section: "" });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Student List */}
      {loading ? (
        <p>Loading...</p>
      ) : students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.cmsId} - {student.name} ({student.section})
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default StudentList;