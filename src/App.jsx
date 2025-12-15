import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Admissions from "./pages/Admissions";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("loggedInUser")));

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup setUser={setUser} />} />

      {/* Protected Routes */}
      <Route
        element={user ? <AdminLayout setUser={setUser} /> : <Navigate to="/login" />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/admissions" element={<Admissions />} />
      </Route>

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}
