import { useState } from "react";
import { validateTitle } from "../utils";

export default function TaskForm({ onAddTask, tasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [due, setDue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = validateTitle(title, tasks);
    if (message) {
      setError(message);
      return;
    }
    onAddTask({ title: title.trim(), priority, due });
    setTitle("");
    setDue("");
    setError("");
  };

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <input
          type="text"
          className={"grow" + (error ? " input-error" : "")}
          placeholder="Add a new task..."
          value={title}
          maxLength={80}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} aria-label="Due date" />
        <button type="submit" className="btn">+ Add</button>
      </div>
      {error && <p className="err">{error}</p>}
    </form>
  );
}
