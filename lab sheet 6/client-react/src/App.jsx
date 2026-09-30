import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'api-lab-secret';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  async function fetchTasks() {
    setLoading(true); setError('');
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);
      setTasks(data);
    } catch (err) { setError(err.message || 'Unable to load tasks'); }
    finally { setLoading(false); }
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setError('');
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ title: title.trim(), completed: false })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);
      setTasks(prev => [...prev, data]);
      setTitle('');
    } catch (err) { setError(err.message || 'Unable to create task'); }
  }

  async function deleteTask(id) {
    setError('');
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE', headers: { 'x-api-key': API_KEY }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) { setError(err.message || 'Unable to delete task'); }
  }

  async function addTaskWithAxios() {
    // Axios automatically parses JSON; errors are surfaced through catch (unlike fetch, which requires checking response.ok).
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title: 'Axios example task', completed: false }, { headers: { 'x-api-key': API_KEY } });
      setTasks(prev => [...prev, response.data]);
    } catch (err) { setError(err.response?.data?.error || err.message); }
  }

  return <main className="container">
    <h1>Task Manager Mini App</h1>
    <p className="subtitle">React + Express REST API</p>
    <form onSubmit={addTask} className="form">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a new task" />
      <button type="submit">Add Task</button>
    </form>
    <button className="secondary" onClick={addTaskWithAxios}>Add Axios Example</button>
    {loading && <p>Loading...</p>}
    {error && <p className="error">Error: {error}</p>}
    {!loading && !error && <ul className="tasks">
      {tasks.map(task => <li key={task.id}>
        <span>{task.title} <small>({task.completed ? 'Completed' : 'Pending'})</small></span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </li>)}
    </ul>}
  </main>;
}
