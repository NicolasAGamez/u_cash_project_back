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
    console.log('Conexión PutUsers realizada');
  }
});
  
// PUT API para actualizar los datos de los clientes por Id
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    let sql = 'UPDATE application_information SET';
    const values = [];

    for (const key in updatedUser) {
        if (key !== 'id') {
            sql += ` ${key} = ?,`;
            values.push(updatedUser[key]);
        }
    }

    if (values.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para la actualización' });
    }

    sql = sql.slice(0, -1); 
    sql += ' WHERE id = ?';
    values.push(userId);

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar los datos del usuario en el servidor', err);
            return res.status(500).json({ error: 'Error al actualizar los datos del usuario en el servidor' });
        }
        return res.status(200).json({ message: 'Información del usuario actualizada con éxito' });
    });
});

module.exports = router;