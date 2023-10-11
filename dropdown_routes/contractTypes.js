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
    console.log('Conexión GetContractType realizada');
  }
});

// GET API para obtener los tipos de contratos
router.get('/contract-type', (req, res) => {
    const sql = 'SELECT * FROM contract_types';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error obteniendo datos de los tipos de contrato del servidor:', err);
        return res.status(500).json({ error: 'Error obteniendo datos de los tipos de contrato del servidor' });
      }

      const contractTypes = results.map(row => ({
        name: row.name
      }));


      return res.status(200).json(contractTypes);
    });
  });
  
  module.exports = router;