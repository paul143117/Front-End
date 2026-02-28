import "./Dashboard.css";
import { useState } from "react";

function Layout({ children, goTo, onLogout }) {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* Sidebar */}
        <div className="sidebar">
          <h2>🎓</h2>
          <button onClick={() => goTo("dashboard")}>Dashboard</button>
          <button onClick={() => goTo("programs")}>Programs</button>
          <button onClick={() => goTo("subjects")}>Subjects</button>
          <button onClick={onLogout}>Logout</button>
        </div>

        {/* Main Content */}
        <div className="main-content">

          {/* Topbar */}
          <div className="topbar">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="profile">
              <span>John Doe</span>
              <div className="avatar"></div>
            </div>
          </div>

          {/* Page Content */}
          {children(search)}

        </div>
      </div>
    </div>
  );
}

export default Layout;