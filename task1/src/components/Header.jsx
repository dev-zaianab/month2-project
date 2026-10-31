export default function Header({ total, completed, overdue, theme, onToggleTheme }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const stats = [
    ["Total", total],
    ["Pending", total - completed],
    ["Done", completed],
    ["Overdue", overdue],
  ];

  return (
    <header className="header">
      <div className="top">
        <div>
          <h1>TaskFlow</h1>
          <div className="sub">Organize your work</div>
        </div>
        <button className="icon-btn" onClick={onToggleTheme} title="Switch theme" aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="stats">
        {stats.map(([label, value]) => (
          <div className="stat" key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="bar" role="progressbar" aria-valuenow={percent}>
        <i style={{ width: percent + "%" }} />
      </div>
    </header>
  );
}
