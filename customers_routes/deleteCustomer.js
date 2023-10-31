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
    console.log('Conexión DeleteCustomer realizada');
  }
});

// DELETE API para borrar los datos de los clientes por Id
router.delete('/delete/:id', (req, res) => {
  const customerId = req.params.id;
  const sql = 'DELETE FROM customers WHERE id = ?';
  connection.query(sql, [customerId], (err, result) => {
    if (err) {
      console.error('Error eliminando datos del servidos:', err);
      return res.status(500).json({ error: 'Error eliminando datos del servidos' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    return res.status(200).json({ message: 'Cliente eliminado correctamente' });
  });
});

module.exports = router;