import React, { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { currentUser, currentUserRole } = useAuth();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("kanbanTasks") || "[]");
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks =
    currentUserRole === "admin"
      ? tasks
      : tasks.filter((task) => task.assignee === currentUser);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const getTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const getEmployeeStatistics = () => {
    const employeeTasks = tasks.filter((task) => task.assignee === "employee");
    return {
      total: employeeTasks.length,
      todo: employeeTasks.filter((task) => task.status === "todo").length,
      progress: employeeTasks.filter((task) => task.status === "progress")
        .length,
      completed: employeeTasks.filter((task) => task.status === "completed")
        .length,
      list: employeeTasks.filter((task) => task.status === "list").length,
    };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        getTasksByStatus,
        getEmployeeStatistics,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
