import React from "react";
import { useTasks } from "../contexts/TaskContext";

function TrackingModal({ isOpen, onClose }) {
  const { tasks, getEmployeeStatistics } = useTasks();
  const stats = getEmployeeStatistics();
  const employeeTasks = tasks.filter((task) => task.assignee === "employee");

  const statusLabels = {
    todo: "To Do",
    progress: "In Progress",
    completed: "Completed",
    list: "List",
  };

  const statusColors = {
    todo: "status-todo",
    progress: "status-progress",
    completed: "status-completed",
    list: "status-list",
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content tracking-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Employee Work Tracking</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="tracking-content">
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>

            <div className="stat-card todo">
              <div className="stat-number">{stats.todo}</div>
              <div className="stat-label">To Do</div>
            </div>

            <div className="stat-card progress">
              <div className="stat-number">{stats.progress}</div>
              <div className="stat-label">In Progress</div>
            </div>

            <div className="stat-card completed">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>

            <div className="stat-card list">
              <div className="stat-number">{stats.list}</div>
              <div className="stat-label">List</div>
            </div>
          </div>

          <div className="tasks-section">
            <h4>Employee Tasks</h4>

            <div className="tasks-list">
              {employeeTasks.length === 0 ? (
                <div className="empty-state">No tasks assigned to employee</div>
              ) : (
                employeeTasks.map((task) => (
                  <div key={task.id} className="tracking-task-card">
                    <div className="tracking-task-header">
                      <span className="tracking-task-title">{task.title}</span>
                      <span
                        className={`status-badge ${statusColors[task.status]}`}
                      >
                        {statusLabels[task.status]}
                      </span>
                    </div>

                    {task.description && (
                      <p className="tracking-task-description">
                        {task.description}
                      </p>
                    )}

                    <div className="tracking-task-meta">
                      Updated: {new Date(task.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingModal;
