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
    console.error('Error conectando con la base de datos', err);
  } else {
    console.log('Conexión DeleteCalculator realizada');
  }
});
  
// DELETE API para borrar los datos de la calculadora por CustomerId
  router.delete('/calculator-info/:customerId', (req, res) => {
    const calculatorCustomerId = req.params.customerId;
    const sql = 'DELETE FROM calculator_info WHERE customerId = ?';
    connection.query(sql, calculatorCustomerId, (err, result) => {
      if (err) {
        console.error('Error al eliminar datos de la calculadora del servidor:', err);
        return res.status(500).json({ error: 'Error al eliminar datos de la calculadora del servidor' });
      }
      return res.status(200).json({ message: 'Información de la calculadora eliminada con éxito' });
    });
  });
  
  module.exports = router;