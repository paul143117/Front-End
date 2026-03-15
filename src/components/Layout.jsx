import "./Dashboard.css";
import { useState } from "react";

function Layout({ children, goTo, onLogout, currentPage, userName }) {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="sidebar-logo">studentportal</div>

          <nav className="sidebar-section">
            <button
              className={`sidebar-link ${currentPage === "dashboard" ? "active" : ""}`}
              type="button"
              onClick={() => goTo("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`sidebar-link ${currentPage === "programs" ? "active" : ""}`}
              type="button"
              onClick={() => goTo("programs")}
            >
              My Program
            </button>
            <button
              className={`sidebar-link ${currentPage === "subjects" ? "active" : ""}`}
              type="button"
              onClick={() => goTo("subjects")}
            >
              My Subjects
            </button>
          </nav>

          <nav className="sidebar-section muted">
            <button
              className={`sidebar-link ${currentPage === "announcements" ? "active" : ""}`}
              type="button"
              onClick={() => goTo("announcements")}
            >
              Announcements
            </button>
            <button
              className={`sidebar-link ${currentPage === "schedule" ? "active" : ""}`}
              type="button"
              onClick={() => goTo("schedule")}
            >
              My Schedule
            </button>
            <button
              className={`sidebar-link ${currentPage === "weather" ? "active" : ""}`}
              type="button"
              onClick={() => goTo("weather")}
            >
              Weather
            </button>
          </nav>

          <button
            className="sidebar-link logout"
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>
        </aside>

        <main className="main-content">
          <div className="topbar">
            {currentPage === "subjects" && (
              <input
                type="text"
                placeholder="Search subjects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            <div className="profile">
              <span>{(userName || "USER").toUpperCase()}</span>
              <div className="avatar" />
            </div>
          </div>

          {children(currentPage === "subjects" ? search : "")}
        </main>
      </div>
    </div>
  );
}

export default Layout;