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
    console.error('Error conectando con el servidor:', err);
  } else {
    console.log('Conexión con el servidor ContractGET MySQL realizada!');
  }
});

// GET COMPANY API
router.get('/contract', (req, res) => {
    const sql = 'SELECT * FROM contract_info';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error obteniendo datos del contrato del servidor:', err);
        return res.status(500).json({ error: 'Error obteniendo datos del contrato del servidor' });
      }
      return res.status(200).json(results);
    });
  });
  
  module.exports = router;