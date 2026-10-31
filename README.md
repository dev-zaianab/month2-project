# Full-Stack Internship Project

```
my-project/
├── frontend/
│   ├── task1/   # Task 1: Task Manager (React, useState)
│   └── task2/   # Task 2: Student Dashboard (fetch + useEffect)
└── backend/     # Task 3 and Task 4: Express + MongoDB API (add your task3-backend files here)
```

## Run a frontend task

```bash
cd frontend/task1      # or frontend/task2
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

## Task 1: Task Manager
Components: App, Header, TaskForm, TaskList, TaskItem (plus Toolbar).
Features: add, delete, complete, edit, validation, priority, due date, search, filter, sort, clear completed, dark mode, saved in localStorage.

## Task 2: Student Dashboard
Loads `public/students.json` with `fetch()` inside `useEffect`.
Handles loading, error (with Try again), and empty states, plus search, class filter and pass/fail filter.

## Backend
Copy the files from `task3-backend` into the `backend/` folder (do not copy `node_modules` or `.env`).
