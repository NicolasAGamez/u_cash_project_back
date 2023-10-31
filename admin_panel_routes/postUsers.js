const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

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
    console.log('Conexión PostUsers realizada');
  }
});


// POST API para el registro de usuarios
router.post('/users', (req, res) => {
  const formData = req.body; // Los datos del formulario se envían como un objeto JSON

  const sql = 'INSERT INTO application_information (identification, name, email, cell, chosenPlan, requiredAmount, validated, approval, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    sql,
    [
      formData.identification,
      formData.name,
      formData.email,
      formData.cell,
      formData.chosenPlan,
      formData.requiredAmount,
      formData.validated,
      formData.approval,
      formData.status

    ],
    (err, result) => {
      if (err){
        if (err.code === 'ER_DUP_ENTRY'){
          console.error(err.stack)
          res.status(409).send('El email ya esta en uso.  Por favor usa un correo diferente');

        } else {
          console.error('Error insertando los datos del nuevo usuario en el servidor:', err);
          res.status(500).send('Error insertando los datos del nuevo usuario en el servidor');
        }
  } else {

      return res.status(201).json({ message: 'Datos del nuevo usuario creados correctamente en el servidor' });
  }
  });

});

module.exports = router;
