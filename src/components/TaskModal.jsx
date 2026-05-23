import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TaskContext";

function TaskModal({ isOpen, onClose, task }) {
  const { currentUser, currentUserRole } = useAuth();
  const { addTask, updateTask } = useTasks();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    assignee: currentUser || "admin",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
        assignee: task.assignee,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "todo",
        assignee: currentUser || "admin",
      });
    }
  }, [task, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    if (task) {
      updateTask(task.id, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        assignee: formData.assignee,
      });
    } else {
      addTask({
        title: formData.title,
        description: formData.description,
        status: formData.status,
        assignee: formData.assignee,
        createdBy: currentUser || "admin",
      });
    }

    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{task ? "Edit Task" : "Add New Task"}</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter task description (optional)"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="list">List</option>
            </select>
          </div>

          {currentUserRole === "admin" && (
            <div className="form-group">
              <label htmlFor="assignee">Assign To</label>
              <select
                value={formData.assignee}
                onChange={(e) => handleChange("assignee", e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {task ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
