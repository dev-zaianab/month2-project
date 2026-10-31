import TaskItem from "./TaskItem";

export default function TaskList({ tasks, allTasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        {allTasks.length ? "No matching tasks found 🔎" : "No tasks yet. Add your first task! 🚀"}
      </div>
    );
  }

  return (
    <ul className="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          allTasks={allTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
