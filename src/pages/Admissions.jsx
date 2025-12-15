import { useState, useEffect } from "react";
import "../pages/Admission.css";

export default function Admissions() {
  const [admissions, setAdmissions] = useState(() => JSON.parse(localStorage.getItem("admissions")) || []);

  useEffect(() => {
    localStorage.setItem("admissions", JSON.stringify(admissions));
  }, [admissions]);

  const updateStatus = (id, status) => {
    setAdmissions(admissions.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="table-page center-page">
      <h1>Admissions</h1>
      {admissions.length === 0 ? <p>No admissions yet.</p> : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.class}</td>
                <td className={`status ${a.status.toLowerCase()}`}>{a.status}</td>
                <td>
                  {a.status === "Pending" && (
                    <>
                      <button className="approve-btn" onClick={() => updateStatus(a.id, "Approved")}>Approve</button>
                      <button className="reject-btn" onClick={() => updateStatus(a.id, "Rejected")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
