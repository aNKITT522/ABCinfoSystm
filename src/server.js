// server.js

const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'companyUser',
  password: 'Ankit@123',
  database: 'companyXYZ'
});




app.get('/', (req, res) => {
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      res.status(500).json({ error: 'Error getting MySQL connection' });
      return;
    }})})

app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
})


.post('/users', async (req, res) => {
  const { username, roles, position, password } = req.body;
  try {
    await axios.post('http://localhost:3000', { username, roles, position });
    

    pool.query(
      'INSERT INTO users (username, roles, position, password) VALUES (?, ?, ?, ?)',
      [username, JSON.stringify(roles), position, password],
      (err, results) => {
        if (err) throw err;
        res.send('User added to database');
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to add user');
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
