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
    console.log('Conexión PostContract realizada');
  }
});

// POST API para los datos de los contratos
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