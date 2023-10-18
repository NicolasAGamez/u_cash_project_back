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
    console.error('Error conectando con la base de datos', err);
  } else {
    console.log('Conexión DeleteUsers realizada');
  }
});
  
// DELETE API para borrar los datos de la compañia por Nit
  router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM application_information WHERE id = ?';
    connection.query(sql, userId, (err, result) => {
      if (err) {
        console.error('Error al eliminar datos del usuario del servidor:', err);
        return res.status(500).json({ error: 'Error al eliminar datos del usuario del servidor' });
      }
      return res.status(200).json({ message: 'Información del usuario eliminada con éxito' });
    });
  });
  
  module.exports = router;