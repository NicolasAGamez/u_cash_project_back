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
    console.log('Conexión con el servidor ContractPOST MySQL realizada!');
  }
});

// POST CONTRACT API
router.post('/contract', (req, res) => {
    const newContract = req.body;
    const {
        nit,
        contracting_entity_name,
        contract_type,
        duration_months,
        total_contract_value,
        supervisor_name,
        supervisor_phone,
        supervisor_email
     } = newContract;
    
    const sql = 'INSERT INTO contract_info (nit, contracting_entity_name, contract_type, duration_months, total_contract_value, supervisor_name, supervisor_phone, supervisor_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    const values = [
      nit,
      contracting_entity_name,
      contract_type,
      duration_months,
      total_contract_value,
      supervisor_name,
      supervisor_phone,
      supervisor_email
     ];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al agregar datos del contrato al servidor:', err);
        return res.status(500).json({ error: 'Error al agregar datos del contrato al servidor' });
      }
      return res.status(201).json({ message: 'Información del contrato añadida con éxito' });
    });
  });
  
  module.exports = router;