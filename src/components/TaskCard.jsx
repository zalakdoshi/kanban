import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TaskContext";

function TaskCard({ task, onEdit, onDragStart, onDragEnd }) {
  const { currentUser, currentUserRole } = useAuth();
  const { deleteTask, moveTask } = useTasks();

  const canEdit = currentUserRole === "admin" || task.assignee === currentUser;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };

  const availableStatuses = ["todo", "progress", "completed", "list"].filter(
    (status) => status !== task.status
  );

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

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`status-badge ${statusColors[task.status]}`}>
          {statusLabels[task.status]}
        </span>
      </div>

      <p className="task-description">{task.description || "No description"}</p>

      <div className="task-meta">
        <div className="task-info">
          <div>
            Assigned to: <strong>{task.assignee}</strong>
          </div>
          <div>Created: {new Date(task.createdAt).toLocaleDateString()}</div>
        </div>

        {canEdit && (
          <div className="task-actions">
            <button className="action-button edit" onClick={() => onEdit(task)}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="action-button delete" onClick={handleDelete}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        )}
      </div>

      <div className="status-buttons">
        {availableStatuses.map((status) => (
          <button
            key={status}
            className="status-move-button"
            onClick={() => moveTask(task.id, status)}
          >
            → {statusLabels[status]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskCard;
