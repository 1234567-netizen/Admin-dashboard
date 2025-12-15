import { useState, useEffect } from "react";
import "../pages/dash.css";

export default function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [admissionsPending, setAdmissionsPending] = useState(0);
  const [admissionsApproved, setAdmissionsApproved] = useState(0);
  const [admissionsRejected, setAdmissionsRejected] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchData = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    const admissions = JSON.parse(localStorage.getItem("admissions")) || [];

    setStudentsCount(students.length);
    setTeachersCount(teachers.length);
    setAdmissionsPending(admissions.filter(a => a.status === "Pending").length);
    setAdmissionsApproved(admissions.filter(a => a.status === "Approved").length);
    setAdmissionsRejected(admissions.filter(a => a.status === "Rejected").length);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>School Admin Dashboard</h1>
        <div className="dashboard-date-time">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </header>

      <div className="dashboard-cards">
        <div className="card total">
          <h2>{studentsCount}</h2>
          <p>Total Students</p>
        </div>
        <div className="card total">
          <h2>{teachersCount}</h2>
          <p>Total Teachers</p>
        </div>
        <div className="card pending">
          <h2>{admissionsPending}</h2>
          <p>Admissions Pending</p>
        </div>
        <div className="card approved">
          <h2>{admissionsApproved}</h2>
          <p>Admissions Approved</p>
        </div>
        <div className="card rejected">
          <h2>{admissionsRejected}</h2>
          <p>Admissions Rejected</p>
        </div>
      </div>
    </div>
  );
}
