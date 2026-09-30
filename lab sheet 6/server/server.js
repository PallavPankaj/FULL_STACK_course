const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

// Global logger middleware: method, URL and timestamp.
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const tasks = [
  { id: 1, title: 'Learn Express.js', completed: true },
  { id: 2, title: 'Build REST API', completed: true },
  { id: 3, title: 'Test API with Postman', completed: false },
  { id: 4, title: 'Create JavaScript client', completed: false },
  { id: 5, title: 'Create React client', completed: false }
];

function authCheck(req, res, next) {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: valid x-api-key is required' });
  }
  next();
}

function findTask(id) {
  return tasks.find(task => task.id === Number(id));
}

app.get('/api/tasks', (req, res) => res.json(tasks));

app.get('/api/tasks/:id', (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.post('/api/tasks', authCheck, (req, res) => {
  const { title, completed = false } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required and must be a string' });
  }
  const task = { id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1, title, completed: Boolean(completed) };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', authCheck, (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = Boolean(completed);
  res.json(task);
});

app.delete('/api/tasks/:id', authCheck, (req, res) => {
  const index = tasks.findIndex(task => task.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  const deleted = tasks.splice(index, 1)[0];
  res.json({ message: 'Task deleted successfully', task: deleted });
});

// 404 handler for unmatched URLs.
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Centralized error handler.
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
