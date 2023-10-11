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
    console.error('Error conectando con el servidor:', err);
  } else {
    console.log('Conexión DeleteReferences realizada');
  }
});

// DELETE API para borrar los datos de las referencias dadas por parte de los clientes por Id
router.delete('/references/:referenceId', (req, res) => {
    const referenceId = req.params.referenceId;
  
    const deleteSql = 'DELETE FROM customers_references WHERE id = ?';
  
    connection.query(deleteSql, referenceId, (err, result) => {
      if (err) {
        console.error('Error al eliminar datos de referencia:', err);
        res.status(500).send('Error al eliminar datos de referencia');
      } else {
        res.status(200).json({ message: 'Datos de referencia eliminados exitosamente del servidor' });
      }
    });
  });
  
  module.exports = router;