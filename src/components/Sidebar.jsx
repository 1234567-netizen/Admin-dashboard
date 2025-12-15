import { NavLink } from "react-router-dom";
import '../components/dashboard.css';
import { FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>School Admin</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav">
          <FaTachometerAlt className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admissions" className="nav">
          <FaClipboardList className="nav-icon" />
          <span>Admissions</span>
        </NavLink>

        <NavLink to="/students" className="nav">
          <FaUserGraduate className="nav-icon" />
          <span>Students</span>
        </NavLink>

        <NavLink to="/teachers" className="nav">
          <FaChalkboardTeacher className="nav-icon" />
          <span>Teachers</span>
        </NavLink>
      </nav>
    </aside>
  );
}
