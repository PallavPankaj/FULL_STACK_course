const express = require('express');
const router = express.Router();

const students = [
  { id: 1, name: 'Pallav Pankaj', course: 'B.Tech CSE' },
  { id: 2, name: 'Aarav Sharma', course: 'B.Tech CSE' }
];

router.get('/', (req, res) => res.json(students));

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    const err = new Error('Student not found');
    err.status = 404;
    return next(err);
  }
  res.json({ id, message: 'Student details', student });
});

module.exports = router;
