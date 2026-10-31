const FILTERS = ["All", "Active", "Completed"];

export default function Toolbar({ search, onSearch, filter, onFilter, sort, onSort, counts }) {
  return (
    <div className="panel">
      <div className="row">
        <input
          type="text"
          className="grow"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sort">
          <option value="newest">Sort: Newest</option>
          <option value="priority">Sort: Priority</option>
          <option value="due">Sort: Due date</option>
          <option value="alpha">Sort: A–Z</option>
        </select>
      </div>
      <div className="tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={"tab" + (filter === f ? " on" : "")}
            onClick={() => onFilter(f)}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>
    </div>
  );
}
