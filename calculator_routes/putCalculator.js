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
    console.log('Conexión PutCalculator realizada');
  }
});

// PUT API para actualizar los datos de la calculadora por CustomerId
router.put('/calculator-info/:customerId', (req, res) => {
    const customerId = req.params.customerId;
    const updatedCalculator = req.body;

    let sql = 'UPDATE calculator_info SET';
    const values = [];

    for (const key in updatedCalculator) {
        sql += ` ${key} = ?,`;
        values.push(updatedCalculator[key]);
    }

    if (values.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para la actualización' });
    }

    sql = sql.slice(0, -1); 
    sql += ' WHERE customerId = ?';
    values.push(customerId);

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar los datos de la calculadora en el servidor:', err);
            return res.status(500).json({ error: 'Error al actualizar los datos de la calculadora en el servidor' });
        }
        return res.status(200).json({ message: 'Datos actualizados con éxito' });
    });
});
module.exports = router;