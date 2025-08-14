import { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="list-group-item">
        <TaskForm
          initial={task}
          onSave={async (payload) => {
            await onUpdate(task, payload);
            setEditing(false);
          }}
        />
        <div className="mt-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setEditing(false)}
          >
            Cancelar
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-start">
        <input
          className="form-check-input me-2 mt-1"
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggle(task)}
        />
        <div>
          <strong
            className={task.completed ? "text-decoration-line-through" : ""}
          >
            {task.title}
          </strong>
          {task.description ? (
            <div className="small text-muted">{task.description}</div>
          ) : null}
        </div>
      </div>
      <div className="btn-group">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setEditing(true)}
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(task)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}