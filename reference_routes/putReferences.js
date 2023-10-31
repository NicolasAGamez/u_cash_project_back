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
    console.log('Conexión PutReferences realizada');
  }
});
  
// PUT API para actualizar los datos de las referencias dadas por los clientes por Id
router.put('/references/:referenceId', (req, res) => {
  const referenceId = req.params.referenceId;
  const formData = req.body;

  const updateSql = 'UPDATE customers_references SET cc = ?, name = ?, cell = ?, email = ? WHERE id = ?';
  const updateValues = [
    formData.cc || null,
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
