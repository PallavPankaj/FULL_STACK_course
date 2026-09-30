const express = require('express');
const router = express.Router();

let members = [
  { id: 1, name: 'Pallav Pankaj', email: 'pallav@example.com' },
  { id: 2, name: 'Aarav Sharma', email: 'aarav@example.com' }
];
let nextId = 3;

router.get('/', (req, res) => res.json(members));

router.get('/:id', (req, res, next) => {
  const member = members.find(m => m.id === Number(req.params.id));
  if (!member) {
    const err = new Error('Member not found');
    err.status = 404;
    return next(err);
  }
  res.json(member);
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  const member = { id: nextId++, name, email };
  members.push(member);
  res.status(201).json(member);
});

router.put('/:id', (req, res, next) => {
  const member = members.find(m => m.id === Number(req.params.id));
  if (!member) {
    const err = new Error('Member not found');
    err.status = 404;
    return next(err);
  }
  if (req.body.name !== undefined) member.name = req.body.name;
  if (req.body.email !== undefined) member.email = req.body.email;
  res.json(member);
});

router.delete('/:id', (req, res, next) => {
  const index = members.findIndex(m => m.id === Number(req.params.id));
  if (index === -1) {
    const err = new Error('Member not found');
    err.status = 404;
    return next(err);
  }
  const deleted = members.splice(index, 1)[0];
  res.json({ message: 'Member deleted', member: deleted });
});

module.exports = router;
