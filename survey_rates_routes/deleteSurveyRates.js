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
    console.error('Error conectando con la base de datos', err);
  } else {
    console.log('Conexión DeleteSurveyRates realizada');
  }
});

// DELETE API para borrar los datos de la calificación por parte de los clientes por CC
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