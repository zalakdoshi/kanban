import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

const predefinedUsers = {
  admin: { password: "admin123", role: "admin" },
  employee: { password: "emp123", role: "employee" },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser && predefinedUsers[savedUser]) {
      setCurrentUser(savedUser);
      setCurrentUserRole(predefinedUsers[savedUser].role);
    }
  }, []);

  const login = (username, password) => {
    const user = predefinedUsers[username];
    if (user && user.password === password) {
      setCurrentUser(username);
      setCurrentUserRole(user.role);
      localStorage.setItem("currentUser", username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserRole(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserRole,
        login,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
