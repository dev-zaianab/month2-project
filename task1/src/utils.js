export const PRIORITY_ORDER = { High: 3, Medium: 2, Low: 1 };

export const today = () => new Date().toISOString().slice(0, 10);

export const isOverdue = (task) => !task.completed && task.due && task.due < today();

export const formatDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "short" });

// Returns an error message, or "" when the title is valid
export function validateTitle(value, tasks, ignoreId) {
  const t = value.trim();
  if (!t) return "Task title cannot be empty.";
  if (t.length < 3) return "Title must be at least 3 characters.";
  if (t.length > 60) return "Title cannot exceed 60 characters.";
  const duplicate = tasks.some(
    (x) => x.id !== ignoreId && x.title.toLowerCase() === t.toLowerCase()
  );
  if (duplicate) return "This task already exists.";
  return "";
}

export function loadFromStorage(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be blocked; the app still works */
  }
}
