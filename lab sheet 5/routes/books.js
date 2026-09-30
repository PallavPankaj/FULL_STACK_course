const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' }
];
let nextId = 3;

router.get('/', (req, res) => res.json(books));

router.get('/:id', (req, res, next) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }
  res.json(book);
});

router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'title and author are required' });
  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});

router.put('/:id', (req, res, next) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }
  const { title, author } = req.body;
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  res.json(book);
});

router.delete('/:id', (req, res, next) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }
  const deleted = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted', book: deleted });
});

module.exports = router;
