const express = require('express')
const app = express()
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./sqlite/mydatabase.db');

app.use(express.json());
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/all', function (req, res) {
  let sql = 'SELECT * FROM todo';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.log(err.message);
    }
    res.json(rows);
    console.log(rows)
  });
})

app.put('/check', function (req, res) {
  const q = req.body;
  const id = q.id;
  const done = q.done;
  let sql = `UPDATE todo
            SET 
            done = '${done}'
            WHERE id = '${id}'`;
  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Row(s) updated: ${this.changes}` });
    console.log(`Row(s) updated: ${this.changes}`);
  });
})

app.post('/insert', function (req, res) {
  const q = req.body;
  const title = q.title;
  const content = q.content;
  const done = q.done;
  db.run(`INSERT INTO todo(title, content, done) VALUES('${title}', '${content}',${done})`, function (err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ message: `A row has been inserted with rowid ${this.lastID}` });
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
})

app.put('/update', function (req, res) {
  const q = req.body;
  const id = q.id;
  const title = q.title;
  const content = q.content;
  let sql = `UPDATE todo
            SET title = '${title}',
            content = '${content}'
            WHERE id = '${id}'`;
  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Row(s) updated: ${this.changes}` });
    console.log(`Row(s) updated: ${this.changes}`);
  });
})

app.delete('/remove', function (req, res) {
  const q = req.body;
  const id = q.id;
  let sql = `DELETE FROM todo WHERE id = '${id}'`;
  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Row(s) deleted: ${this.changes}` });
    console.log(`Row(s) deleted: ${this.changes}`);
  });
})

app.listen(3000)