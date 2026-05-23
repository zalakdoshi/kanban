import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const success = login(username, password);
    if (!success) {
      setError("Invalid credentials. Please check the demo credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sign in to Kanban</h2>
          <p>Task Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="demo-credentials">
            <strong>Demo Credentials:</strong>
            <br />
            Admin: admin / admin123
            <br />
            Employee: employee / emp123
          </div>

          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
