import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext"; // Import TaskProvider
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* TaskProvider now wraps the routes */}
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
