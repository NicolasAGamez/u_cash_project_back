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
    console.log('Conexión con el servidor surveyRatesPOST MySQL realizada!');
  }
});

// POST CONTRACT API
router.post('/survey-rates', (req, res) => {
    const newSurvey = req.body;
    const {
        cc,
        name,
        rate
     } = newSurvey;
    
    const sql = 'INSERT INTO customers_rates_survey (cc, name, rate) VALUES (?, ?, ?)';
    
    const values = [
        cc,
        name,
        rate
     ];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al agregar datos de la encuesta al servidor:', err);
        return res.status(500).json({ error: 'Error al agregar datos de la encuesta al servidor' });
      }
      return res.status(201).json({ message: 'Información de la encuesta añadida con éxito' });
    });
  });
  
  module.exports = router;