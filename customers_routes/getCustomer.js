const express = require('express');
const router = express.Router(); 
const mysql = require('mysql2');

// configuración de la base de datos MySQL
const dbConfig = {
    host: 'demo-umonei-aws.cbg6k7u60pgo.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'root', 
    password: 'eHrZp*H0358w', 
    database: 'db_demo_umonei',
  };

// Establecer conexión con el servidor MySQL  
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error conectando con el servidor:', err);
  } else {
    console.log('Conexión GetCustomer realizada');
  }
});

// GET API para obtener la información de los clientes 
router.get('/customers', (req, res) => {
  const sql = 'SELECT * FROM customers';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error obteniendo datos de usuarios del servidor:', err);
      return res.status(500).json({ error: 'Error obteniendo datos de usuarios del servidor' });
    }
    return res.status(200).json(results);
  });
});

module.exports = router;