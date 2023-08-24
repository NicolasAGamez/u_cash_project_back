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
    console.log('Conexión con el servidor referencesPOST MySQL realizada!');
  }
});


// POST API para referencias 
router.post('/references', (req, res) => {
    const formData = req.body; // Form data sent as a JSON object
  
    const reference1Sql = 'INSERT INTO customers_references (nit, name, cell, email) VALUES (?, ?, ?, ?)';
    const reference2Sql = 'INSERT INTO customers_references (nit, name, cell, email) VALUES (?, ?, ?, ?)';
  
    const reference1Values = [formData.nit, formData.nameReference1, formData.cellNumberReference1, formData.emailReference1];
    const reference2Values = [formData.nit, formData.nameReference2, formData.cellNumberReference2, formData.emailReference2];
  
    connection.query(reference1Sql, reference1Values, (err1, result1) => {
      if (err1) {
        console.error('Error al insertar datos para la referencia 1:', err1);
        res.status(500).send('Error al insertar datos para la referencia 1');
      } else {
        connection.query(reference2Sql, reference2Values, (err2, result2) => {
          if (err2) {
            console.error('Error al insertar datos para la referencia 2:', err2);
            res.status(500).send('Error al insertar datos para la referencia 2');
          } else {
            res.status(201).json({ message: 'Datos de referencias creados exitosamente en el servidor.' });
          }
        });
      }
    });
  });
  
  module.exports = router;