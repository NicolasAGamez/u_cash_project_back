const express = require('express');
const router = express.Router(); 
const mysql = require('mysql2');

// configuración de la base de datos MySQL
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root', 
  password: 'eHrZp*H0358w',
  database: 'u_cash_customers',
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database successfully!');
  }
});

// POST API 
router.post('/register', (req, res) => {
  const formData = req.body; // Los datos del formulario se envían como un objeto JSON
  const sql = 'INSERT INTO customers (name, email, cell) VALUES (?, ?, ?)';
  connection.query(sql, [formData.nameUser, formData.email, formData.celphoneNumber], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).json({ error: 'Error inserting data into the database' });
    }
    return res.status(201).json({ message: 'Data inserted successfully' });
  });
});

module.exports = router;