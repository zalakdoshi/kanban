import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TaskContext";
import Header from "../components/Header";
import KanbanColumn from "../components/KanbanColumn";
import TaskModal from "../components/TaskModal";
import TrackingModal from "../components/TrackingModal";

function Dashboard() {
  const { currentUserRole } = useAuth();
  const { getTasksByStatus, moveTask } = useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.status !== status) {
      moveTask(data.id, status);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const columns = [
    {
      status: "todo",
      title: "To Do",
      color: "color-blue",
      tasks: getTasksByStatus("todo"),
    },
    {
      status: "progress",
      title: "In Progress",
      color: "color-yellow",
      tasks: getTasksByStatus("progress"),
    },
    {
      status: "completed",
      title: "Completed",
      color: "color-green",
      tasks: getTasksByStatus("completed"),
    },
    {
      status: "list",
      title: "List",
      color: "color-purple",
      tasks: getTasksByStatus("list"),
    },
  ];

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-content">
        <div className="control-panel">
          <h2>Task Management</h2>
          <div className="control-buttons">
            <button
              className="add-task-button"
              onClick={() => setIsTaskModalOpen(true)}
            >
              <i className="fas fa-plus"></i>
              Add Task
            </button>

            {currentUserRole === "admin" && (
              <button
                className="track-button"
                onClick={() => setIsTrackingModalOpen(true)}
              >
                <i className="fas fa-chart-line"></i>
                Track Employee Work
              </button>
            )}
          </div>
        </div>

        <div className="kanban-board">
          {columns.map((column) => (
            <KanbanColumn
              key={column.status}
              status={column.status}
              title={column.title}
              color={column.color}
              tasks={column.tasks}
              onEditTask={handleEditTask}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        task={editingTask}
      />

      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
