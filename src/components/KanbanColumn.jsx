import React from "react";
import TaskCard from "./TaskCard";

function KanbanColumn({
  status,
  title,
  color,
  tasks,
  onEditTask,
  onDrop,
  onDragOver,
}) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-title">
          <span className={`column-indicator ${color}`}></span>
          <span>{title}</span>
        </div>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div
        className="column-content"
        onDrop={(e) => onDrop(e, status)}
        onDragOver={onDragOver}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDragStart={(e, task) => {
              e.dataTransfer.setData(
                "text/plain",
                JSON.stringify({
                  id: task.id,
                  status: task.status,
                })
              );
            }}
            onDragEnd={() => {}}
          />
        ))}

        {tasks.length === 0 && (
          <div className="empty-column">No tasks in {title.toLowerCase()}</div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
