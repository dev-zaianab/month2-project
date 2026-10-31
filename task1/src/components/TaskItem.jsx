import { useState } from "react";
import { validateTitle, isOverdue, formatDate } from "../utils";

export default function TaskItem({ task, allTasks, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);
  const [error, setError] = useState("");

  const save = () => {
    const message = validateTitle(value, allTasks, task.id);
    if (message) {
      setError(message);
      return;
    }
    onEdit(task.id, value.trim());
    setEditing(false);
    setError("");
  };

  const cancel = () => {
    setEditing(false);
    setValue(task.title);
    setError("");
  };

  return (
    <li className={"item" + (task.completed ? " done" : "")}>
      <input
        type="checkbox"
        className="chk"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={"Complete " + task.title}
      />

      {editing ? (
        <div className="body">
          <input
            type="text"
            autoFocus
            className={"edit-input" + (error ? " input-error" : "")}
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(""); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
          />
          {error && <p className="err">{error}</p>}
        </div>
      ) : (
        <div className="body">
          <div className="t">{task.title}</div>
          <div className="meta">
            <span className={"badge b-" + task.priority}>{task.priority}</span>
            {task.due && (
              <span className={isOverdue(task) ? "over" : ""}>
                📅 {formatDate(task.due)}{isOverdue(task) ? " (overdue)" : ""}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="acts">
        {editing ? (
          <>
            <button onClick={save} title="Save">✔️</button>
            <button onClick={cancel} title="Cancel">↩️</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} title="Edit">✏️</button>
            <button onClick={() => onDelete(task.id)} title="Delete" aria-label={"Delete " + task.title}>🗑️</button>
          </>
        )}
      </div>
    </li>
  );
}
