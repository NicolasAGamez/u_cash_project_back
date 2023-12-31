const express = require('express');
const router = express.Router(); 
const mysql = require('mysql2');
const { sendOTPToEmail } = require('./sendOTP'); // Import the sendOTPToEmail function from sendOTP.js

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
    console.log('Conexión con el servidor POST MySQL realizada!');
  }
});


// POST API 
router.post('/register', (req, res) => {
  const formData = req.body; // Los datos del formulario se envían como un objeto JSON


  const sql = 'INSERT INTO customers (name, email, cell, city, address) VALUES (?, ?, ?, ?)';
  connection.query(sql, [formData.nameUser, formData.email, formData.celphoneNumber, city, address], (err, result) => {  // formData.nameUser, formData.email, formData.celphoneNumber, verificationCode
    if (err){ 
      if (err.code === 'ER_DUP_ENTRY'){
        console.error(err.stack)
        res.status(409).send('El email ya esta en uso.  Por favor usa un correo diferente');
    
      } else {
        console.error('Error insertando los datos en el servidor:', err);
        res.status(500).send('Error insertando los datos en el servidor');
      }
  } else {
     // Sending OTP via email
      const otp = sendOTPToEmail(formData.email);

      return res.status(201).json({ message: 'Datos creados correctamente en el servidor' });
  }
  });

});

module.exports = router;