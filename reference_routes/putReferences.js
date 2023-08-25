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
      console.error('Error conectando con la base de datos', err);
    } else {
      console.log('Conexión con el servidor PUT MySQL realizada!');
    }
  });
  
// PUT API por referencia ID
router.put('/references/:referenceId', (req, res) => {
    const referenceId = req.params.referenceId;
    const formData = req.body; // Form data sent as a JSON object
  
    const updateSql = 'UPDATE customers_references SET nit = ?, name = ?, cell = ?, email = ? WHERE id = ?';
    const updateValues = [
      formData.nit || null,
      formData.nameReference || null,
      formData.cellNumberReference || null,
      formData.emailReference || null,
      referenceId
    ];
  
    connection.query(updateSql, updateValues, (err, result) => {
      if (err) {
        console.error('Error al actualizar datos de referencias:', err);
        res.status(500).send('Error al actualizar datos de referencias');
      } else {
        res.status(200).json({ message: 'Datos de referencias actualizados exitosamente en el servidor.' });
      }
    });
  });
  
  module.exports = router;
  