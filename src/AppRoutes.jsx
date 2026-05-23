import React from "react";
import { useAuth } from "./contexts/AuthContext";
// No need to import TaskProvider here anymore
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  // Conditionally render the page component directly
  if (!isAuthenticated) {
    return <Login />;
  }

  // The Dashboard will be rendered within the TaskProvider from App.js
  return <Dashboard />;
}

export default AppRoutes;
