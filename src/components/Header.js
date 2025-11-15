import React from "react";
import "./Header.css";

const Header = ({ setCurrentPage }) => {
  return (
    <header className="header">
      <div 
        className="logo"
        onClick={() => setCurrentPage("dashboard")}
        style={{ cursor: "pointer" }}
      >
        MyHealth <span className="heartbeat">♥</span>
      </div>

      <nav className="nav-icons">

        {/* Home */}
        <button 
          className="icon-btn" 
          aria-label="Home"
          onClick={() => setCurrentPage("dashboard")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </button>

        {/* Appointments */}
        <button 
          className="icon-btn" 
          aria-label="Calendar"
          onClick={() => setCurrentPage("appointments")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>

        {/* Health Records */}
        <button 
          className="icon-btn" 
          aria-label="Documents"
          onClick={() => setCurrentPage("health-records")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </button>

        {/* Profile */}
        <button 
          className="icon-btn" 
          aria-label="Profile"
          onClick={() => setCurrentPage("profile")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

      </nav>
    </header>
  );
};

export default Header;