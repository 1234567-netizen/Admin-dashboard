import { useState, useEffect } from "react";
import "../pages/Student.css";

export default function Students() {
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem("students")) || []);
  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) return;

    if (editId !== null) {
      // Update student
      setStudents(students.map(s => s.id === editId ? { ...s, ...newStudent, age: parseInt(newStudent.age) } : s));
      setEditId(null);
    } else {
      // Add new student
      const id = students.length ? students[students.length - 1].id + 1 : 1;
      const studentObj = { ...newStudent, id, age: parseInt(newStudent.age) };
      setStudents([...students, studentObj]);

      // Auto add to Admissions
      const admissions = JSON.parse(localStorage.getItem("admissions")) || [];
      admissions.push({ id, name: newStudent.name, class: newStudent.class, status: "Pending" });
      localStorage.setItem("admissions", JSON.stringify(admissions));
    }

    setNewStudent({ name: "", class: "", age: "" });
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));

    // Remove from admissions too
    const admissions = JSON.parse(localStorage.getItem("admissions")) || [];
    const updatedAdmissions = admissions.filter(a => a.id !== id);
    localStorage.setItem("admissions", JSON.stringify(updatedAdmissions));
  };

  const editStudent = (student) => {
    setNewStudent({ name: student.name, class: student.class, age: student.age });
    setEditId(student.id);
  };

  return (
    <div className="table-page center-page">
      <h1>Students</h1>
      <div className="add-student-form">
        <input type="text" name="name" placeholder="Name" value={newStudent.name} onChange={handleChange} />
        <input type="text" name="class" placeholder="Class" value={newStudent.class} onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" value={newStudent.age} onChange={handleChange} />
        <button onClick={handleSubmit}>{editId !== null ? "Update Student" : "Add Student"}</button>
      </div>

      {students.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>{s.age}</td>
                <td>
                  <button className="edit-btn" onClick={() => editStudent(s)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteStudent(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
