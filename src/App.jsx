import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PhoneLogin from "./pages/PhoneLogin";
import StudentForm from "./pages/StudentForm";
import StudentList from "./pages/StudentList";
import StudentOptions from "./pages/StudentOptions";
import "./App.css";

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/phone-login">Phone Login</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/phone-login" element={<PhoneLogin />} />
        <Route path="/student-options" element={<StudentOptions />} />
        <Route path="/students" element={<StudentForm />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/" element={<h2>Welcome! Please login or signup.</h2>} />
      </Routes>
    </div>
  );
}

export default App;