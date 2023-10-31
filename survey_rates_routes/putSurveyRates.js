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
    console.log('Conexión PutSurveyRates realizada');
  }
});

// PUT API para actualizar los datos de la calificación por parte de los clientes por CC
router.put('/survey-rates/:cc', (req, res) => {
    const surveyCC = req.params.cc;
    const updatedSurvey = req.body;

    let sql = 'UPDATE customers_rates_survey SET';
    const values = [];

    for (const key in updatedSurvey) {
        if (key !== 'cc') {
            sql += ` ${key} = ?,`;
            values.push(updatedSurvey[key]);
        }
    }

    if (values.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para la actualización' });
    }

    sql = sql.slice(0, -1); 
    sql += ' WHERE cc = ?';
    values.push(surveyCC);

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar los datos de la encuesta en el servidor', err);
            return res.status(500).json({ error: 'Error al actualizar los datos de la encuesta en el servidor' });
        }
        return res.status(200).json({ message: 'Información de la encuesta actualizada con éxito' });
    });
});

module.exports = router;