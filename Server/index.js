const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ajay@1224',
  database: 'jokes_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

// Save 
app.post('/favourites', (req, res) => {
  const { id, joke } = req.body;
  db.query('INSERT INTO favourites (id, joke) VALUES (?, ?)', [id, joke], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving joke.');
    } else {
      res.send('Joke saved!');
    }
  });
});

// get fv saved jokes
app.get('/favourites', (req, res) => {
  db.query('SELECT * FROM favourites', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving jokes.');
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
