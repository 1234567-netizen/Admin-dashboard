import { Outlet } from "react-router-dom";
import "./adminLayout.css";

export default function AdminLayout({ setUser }) {
  const username = JSON.parse(localStorage.getItem("loggedInUser"))?.name;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/students">Students</a>
          <a href="/teachers">Teachers</a>
          <a href="/admissions">Admissions</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h2>School Dashboard</h2>
          </div>
          <div className="topbar-right">
            <span className="welcome-msg">Welcome, <strong>{username}</strong></span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
