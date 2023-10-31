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
    console.log('Conexión PostReferences realizada');
  }
});


// POST API para la información de las referencias por parte del cliente
router.post('/references', (req, res) => {
    const formData = req.body;
    const reference1Values = [formData.cc, formData.nameReference1, formData.cellNumberReference1, formData.emailReference1];

   // Consulta SQL para verificar duplicados en cualquiera de las columnas
   const checkDuplicateSql = `SELECT COUNT(*) AS count FROM customers_references WHERE cc = ? OR name = ? OR cell = ? OR email = ?`;

  connection.query(checkDuplicateSql, reference1Values, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error al verificar duplicados:', checkErr);
      return res.status(500).send('Error al verificar duplicados');
    }

   const duplicateCount = checkResult[0].count;

   if (duplicateCount > 0) {
     console.error('Datos de referencia ya existen en la base de datos.');
     return res.status(409).send('Datos de referencia ya existen en la base de datos.');
   }

   // Si no hay duplicados, proceder con la inserción de referencia 1
   const reference1Sql = 'INSERT INTO customers_references (cc, name, cell, email) VALUES (?, ?, ?, ?)';

   connection.query(reference1Sql, reference1Values, (err1) => {
     if (err1) {
       console.error('Error al insertar datos para la referencia 1:', err1);
       return res.status(500).send('Error al insertar datos para la referencia 1');
     }

     // Verificar y proceder con la inserción de referencia 2
     const reference2Values = [formData.cc, formData.nameReference2, formData.cellNumberReference2, formData.emailReference2];
     const reference2Sql = 'INSERT INTO customers_references (cc, name, cell, email) VALUES (?, ?, ?, ?)';

     connection.query(reference2Sql, reference2Values, (err2) => {
       if (err2) {
         console.error('Error al insertar datos para la referencia 2:', err2);
         return res.status(500).send('Error al insertar datos para la referencia 2');
       }

       res.status(201).json({ message: 'Datos de referencias creados exitosamente en el servidor.' });
     });
   });
 });
});
  module.exports = router;
