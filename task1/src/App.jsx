import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Toolbar from "./components/Toolbar";
import TaskList from "./components/TaskList";
import { PRIORITY_ORDER, isOverdue, loadFromStorage, saveToStorage } from "./utils";

const SAMPLE_TASKS = [
  { id: 1, title: "Build React components", priority: "High", due: "", completed: true },
  { id: 2, title: "Manage state with useState", priority: "Medium", due: "", completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState(() => loadFromStorage("tf-tasks", SAMPLE_TASKS));
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(() =>
    loadFromStorage(
      "tf-theme",
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    )
  );

  // Save tasks and theme whenever they change
  useEffect(() => saveToStorage("tf-tasks", tasks), [tasks]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveToStorage("tf-theme", theme);
  }, [theme]);

  // ----- Task actions -----
  const addTask = (task) =>
    setTasks((prev) => [{ id: Date.now(), completed: false, ...task }, ...prev]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const editTask = (id, title) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.completed));

  // ----- Derived data -----
  const completed = tasks.filter((t) => t.completed).length;
  const counts = { All: tasks.length, Active: tasks.length - completed, Completed: completed };

  const visibleTasks = useMemo(() => {
    let list = tasks.filter((t) =>
      filter === "All" ? true : filter === "Active" ? !t.completed : t.completed
    );
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((t) => t.title.toLowerCase().includes(q));

    const sorted = [...list];
    if (sort === "priority") sorted.sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]);
    if (sort === "due") sorted.sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"));
    if (sort === "alpha") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [tasks, filter, sort, search]);

  return (
    <div className="app">
      <Header
        total={tasks.length}
        completed={completed}
        overdue={tasks.filter(isOverdue).length}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <TaskForm onAddTask={addTask} tasks={tasks} />
      <Toolbar
        search={search} onSearch={setSearch}
        filter={filter} onFilter={setFilter}
        sort={sort} onSort={setSort}
        counts={counts}
      />
      <TaskList
        tasks={visibleTasks}
        allTasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      {tasks.length > 0 && (
        <div className="foot">
          <span>{counts.Active} tasks remaining</span>
          {completed > 0 && (
            <button className="btn danger" onClick={clearCompleted}>Clear completed</button>
          )}
        </div>
      )}
    </div>
  );
}
