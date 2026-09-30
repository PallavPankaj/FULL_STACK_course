const API_URL = 'http://localhost:5000/api/tasks';
const statusEl = document.getElementById('status');
const listEl = document.getElementById('taskList');

async function loadTasks() {
  statusEl.textContent = 'Loading...';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const tasks = await response.json();
    listEl.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.title} — ${task.completed ? 'Completed' : 'Pending'}`;
      listEl.appendChild(li);
    });
    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}. Please check that the server is running.`;
  }
}
loadTasks();
