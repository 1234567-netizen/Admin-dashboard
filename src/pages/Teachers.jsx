import { useState, useEffect } from "react";
import "../pages/Teacher.css";

export default function Teachers() {
  // Default 50 teachers
  const defaultTeachers = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Teacher ${i + 1}`,
    subject: ["Math", "Science", "English", "History", "Physics"][i % 5],
  }));

  // Get from LocalStorage or use default
  const [teachers, setTeachers] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("teachers"));
    return stored && stored.length ? stored : defaultTeachers;
  });

  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" });

  // Save to LocalStorage whenever teachers change
  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  // Add new teacher
  const addTeacher = () => {
    if (!newTeacher.name || !newTeacher.subject) return;
    const id = teachers.length ? teachers[teachers.length - 1].id + 1 : 1;
    setTeachers([...teachers, { ...newTeacher, id }]);
    setNewTeacher({ name: "", subject: "" });
  };

  // Delete teacher
  const deleteTeacher = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const handleChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  return (
    <div className="table-page center-page">
      <h1>Teachers</h1>

      {/* Add Teacher */}
      <div className="add-teacher-form">
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={newTeacher.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={handleChange}
        />
        <button onClick={addTeacher}>Add Teacher</button>
      </div>

      {/* Teachers Table */}
      {teachers.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTeacher(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
