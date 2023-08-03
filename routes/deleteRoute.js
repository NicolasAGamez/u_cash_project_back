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
    console.log('Conexión con el servidor DELETE MySQL realizada!');
  }
});

// DELETE API por customer ID
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