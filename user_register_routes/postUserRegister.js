const express = require('express');
const router = express.Router(); 
const mysql = require('mysql2');
const { sendOTPToEmail } = require('./sendOTP'); // Importa la función sendOTPToEmail desde sendOTP.js

// Configuración de la base de datos MySQL
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
    console.log('Conexión PostUserRegister realizada');
  }
});

// POST API para el registro de los usuarios (no clientes, registro/login)
router.post('/user_register', (req, res) => {
  const formData = req.body; 

  const sql = 'INSERT INTO user_register (name, email, cell) VALUES (?, ?, ?)';
  connection.query(sql, [formData.nameUser, formData.email, formData.celphoneNumber], (err, result) => {  
    if (err){ 
      if (err.code === 'ER_DUP_ENTRY'){
        console.error(err.stack)
        res.status(409).send('El email ya está en uso. Por favor usa un correo diferente');
      } else {
        console.error('Error insertando los datos en el servidor:', err);
        res.status(500).send('Error insertando los datos en el servidor');
      }
    } else {
      const otp = sendOTPToEmail(formData.email);

      return res.status(201).json({ message: 'Datos creados correctamente en el servidor', otp });
    }
  });
});

module.exports = router;