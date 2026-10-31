import { useState, useEffect } from "react";

const API_URL = "/students.json"; // file inside the "public" folder
const PASS_MARKS = 40;

export default function App() {
  // 1. State: data + loading/error + search + filters
  const [students, setStudents] = useState([]);  // data from the API
  const [loading, setLoading] = useState(true);  // true while waiting
  const [error, setError] = useState("");        // error message (empty = no error)
  const [search, setSearch] = useState("");      // search text
  const [result, setResult] = useState("all");   // all | pass | fail
  const [grade, setGrade] = useState("all");     // all | 9th | 10th | 11th
  const [reload, setReload] = useState(0);       // change this number to fetch again

  // 2. useEffect: runs when the page opens, and again whenever "reload" changes
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Server error (" + res.status + ")");
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // cleanup
  }, [reload]);

  // 3. Search + filters
  const isPass = (st) => st.marks >= PASS_MARKS;

  const visible = students
    .filter((st) => st.name.toLowerCase().includes(search.toLowerCase()))
    .filter((st) => grade === "all" || st.grade === grade)
    .filter((st) => result === "all" || (result === "pass" ? isPass(st) : !isPass(st)));

  const passCount = students.filter(isPass).length;
  const average = students.length
    ? Math.round(students.reduce((sum, st) => sum + st.marks, 0) / students.length)
    : 0;
  const tryAgain = () => setReload((n) => n + 1);

  // 4. What to show on screen
  let content;
  if (loading) {
    content = (
      <div className="msg">
        <div className="spinner" />
        Loading students...
      </div>
    );
  } else if (error) {
    content = (
      <div className="msg error">
        <div className="big">⚠️</div>
        <p>Something went wrong: {error}</p>
        <button className="btn" onClick={tryAgain}>Try again</button>
      </div>
    );
  } else if (visible.length === 0) {
    content = (
      <div className="msg">
        <div className="big">📭</div>
        <p>No students found.</p>
      </div>
    );
  } else {
    content = visible.map((st) => (
      <div className="item" key={st.id}>
        <div>
          <div className="name">{st.name}</div>
          <div className="meta">Roll #{st.rollNo} • Class {st.grade} • {st.city}</div>
        </div>
        <div className="right">
          <span className="marks">{st.marks}%</span>
          <span className={"badge " + (isPass(st) ? "pass" : "fail")}>
            {isPass(st) ? "Pass" : "Fail"}
          </span>
        </div>
      </div>
    ));
  }

  const summary = [
    ["Students", students.length],
    ["Passed", passCount],
    ["Failed", students.length - passCount],
    ["Average", average + "%"],
  ];

  return (
    <div className="app">
      <h1>Student Dashboard</h1>
      <p className="sub">Student data loaded from an API using fetch()</p>

      {!loading && !error && (
        <div className="counts">
          {summary.map(([label, value]) => (
            <div className="count" key={label}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="row">
        <input
          type="text"
          placeholder="Search student name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value)} aria-label="Filter by class">
          <option value="all">All classes</option>
          <option value="9th">Class 9th</option>
          <option value="10th">Class 10th</option>
          <option value="11th">Class 11th</option>
        </select>
      </div>

      <div className="tabs">
        {[["all", "All"], ["pass", "Pass"], ["fail", "Fail"]].map(([key, label]) => (
          <button
            key={key}
            className={"tab" + (result === key ? " on" : "")}
            onClick={() => setResult(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {content}
    </div>
  );
}
