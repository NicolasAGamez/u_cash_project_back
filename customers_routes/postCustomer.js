const express = require('express');
const router = express.Router(); 
const mysql = require('mysql2');
const { sendOTPToEmail } = require('../user_register_routes/sendOTP'); // Importar la función sendOTPToEmail desde sendOTP.js

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
    console.log('Conexión PostCustomer realizada');
  }
});


// POST API para el registro de usuarios
router.post('/register', (req, res) => {
  const formData = req.body; // Los datos del formulario se envían como un objeto JSON

  // Establece un valor predeterminado para personType si no se proporciona
  const personType = formData.personType || 'Legal';
  
  const sql = 'INSERT INTO customers (name, identification, nit, city, address, cell, email, person_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    sql, 
    [
      formData.nameUser, 
      formData.identification, 
      formData.nit, formData.city, 
      formData.address, 
      formData.celphoneNumber, 
      formData.email, 
      personType
    ], 
    (err, result) => {  
      if (err){ 
        if (err.code === 'ER_DUP_ENTRY'){
          console.error(err.stack)
          res.status(409).send('El email ya esta en uso.  Por favor usa un correo diferente');
      
        } else {
          console.error('Error insertando los datos en el servidor:', err);
          res.status(500).send('Error insertando los datos en el servidor');
        }
  } else {

      return res.status(201).json({ message: 'Datos creados correctamente en el servidor' });
  }
  });

});

module.exports = router;