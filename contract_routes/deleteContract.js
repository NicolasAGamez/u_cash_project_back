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
    console.log('Conexión DeleteContract realizada');
  }
});
  
// DELETE API para borrar los datos de los contratos por Nit
  router.delete('/contract/:nit', (req, res) => {
    const companyNit = req.params.nit;
    const sql = 'DELETE FROM contract_info WHERE nit = ?';
    connection.query(sql, companyNit, (err, result) => {
      if (err) {
        console.error('Error al eliminar datos de la empresa del servidor:', err);
        return res.status(500).json({ error: 'Error al eliminar datos del contrato del servidor' });
      }
      return res.status(200).json({ message: 'Información del contrato eliminado con éxito' });
    });
  });
  
  module.exports = router;