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
      console.log('Conexión con el servidor surveyRatesDELETE MySQL realizada!');
    }
  });
  
// DELETE COMPANY API POR NIT
  router.delete('/survey-rates/:cc', (req, res) => {
    const surveyCC = req.params.cc;
    const sql = 'DELETE FROM customers_rates_survey WHERE cc = ?';
    connection.query(sql, surveyCC, (err, result) => {
      if (err) {
        console.error('Error al eliminar datos de la encuesta del servidor:', err);
        return res.status(500).json({ error: 'Error al eliminar datos de la encuesta del servidor' });
      }
      return res.status(200).json({ message: 'Información de la encuesta eliminado con éxito' });
    });
  });
  
  module.exports = router;