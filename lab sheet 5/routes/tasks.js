const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: 'Complete Express Lab', completed: false },
  { id: 2, title: 'Test API in Postman', completed: false }
];
let nextId = 3;

router.get('/', (req, res) => res.json(tasks));

router.get('/:id', (req, res, next) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }
  res.json(task);
});

router.post('/', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = { id: nextId++, title, completed };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res, next) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }
  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  res.json(task);
});

router.delete('/:id', (req, res, next) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) {
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }
  const deleted = tasks.splice(index, 1)[0];
  res.json({ message: 'Task deleted', task: deleted });
});

module.exports = router;
