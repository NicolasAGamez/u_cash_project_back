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

// Establecer conexión con el servidor MySQL  
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error conectando con el servidor:', err);
  } else {
    console.log('Conexión GetReferences realizada');
  }
});

// GET API para obtener la información de las referencias por parte de los clientes 
router.get('/references', (req, res) => {
  const sql = 'SELECT * FROM customers_references';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error obteniendo datos del servidor:', err);
      return res.status(500).json({ error: 'Error obteniendo datos del servidor' });
    }
    return res.status(200).json(results);
  });
});

module.exports = router;