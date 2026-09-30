require('dotenv').config();
const express = require('express');
const path = require('path');

const studentsRouter = require('./routes/students');
const booksRouter = require('./routes/books');
const membersRouter = require('./routes/members');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 4000;

// Part D: global request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Part E: JSON and form parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Part I: static files
app.use(express.static(path.join(__dirname, 'public')));

// Part D: fake API key for /admin routes
app.use('/admin', (req, res, next) => {
  if (!req.headers['x-api-key']) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// Part A
app.get('/', (req, res) => res.send('Express Lab Running'));

// Part B
app.get('/about', (req, res) => {
  res.json({ name: 'Pallav Pankaj', rollNumber: '40' });
});

app.get('/courses', (req, res) => {
  res.json(['Full Stack Web Development', 'Data Structures', 'Computer Vision']);
});

app.post('/echo', (req, res) => res.json(req.body));

// Part C
app.get('/search', (req, res) => {
  res.json({ name: req.query.name, age: req.query.age });
});

app.get('/products/:category/:id', (req, res) => {
  res.json({ category: req.params.category, id: req.params.id });
});

// Part D
app.get('/admin/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard data', authenticated: true });
});

// Part E
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json({ message: `Registration successful for ${name}`, email, passwordReceived: Boolean(password) });
});

app.post('/contact', (req, res) => {
  console.log('Contact form:', req.body);
  res.send(`Thank you for contacting us, ${req.body.name || 'user'}!`);
});

// Part F/J routers
app.use('/api/students', studentsRouter);
app.use('/api/books', booksRouter);
app.use('/api/members', membersRouter);
app.use('/api/tasks', tasksRouter);

// Part H: 404 handler
app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

// Part H: centralized error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
