import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Header() {
  const { currentUser, currentUserRole, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>Kanban Board</h1>
          <span className="role-badge">{currentUserRole?.toUpperCase()}</span>
        </div>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fas ${isDarkMode ? "fa-moon" : "fa-sun"}`}></i>
          </button>

          <span className="username">{currentUser}</span>

          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
