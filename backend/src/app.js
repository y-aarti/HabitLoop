const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/questions', (req, res) => {
  const questions = db
    .prepare('SELECT * FROM questions ORDER BY id DESC')
    .all();

  res.json(questions);
});

app.post('/questions', (req, res) => {
  const { question, category } = req.body;

  const stmt = db.prepare(`
    INSERT INTO questions(question, category)
    VALUES (?, ?)
  `);

  const result = stmt.run(question, category);

  res.status(201).json({
    id: result.lastInsertRowid,
    question,
    category,
  });
});

app.put('/questions/:id', (req, res) => {
  const { question, category } = req.body;

  const stmt = db.prepare(`
    UPDATE questions
    SET question = ?, category = ?
    WHERE id = ?
  `);

  stmt.run(question, category, req.params.id);

  res.json({
    message: 'Updated',
  });
});

app.delete('/questions/:id', (req, res) => {
  const stmt = db.prepare(`
    DELETE FROM questions
    WHERE id = ?
  `);

  stmt.run(req.params.id);

  res.json({
    message: 'Deleted',
  });
});

module.exports = app;
