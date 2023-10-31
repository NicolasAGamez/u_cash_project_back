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
    console.log('Conexión PutCustomer realizada');
  }
});
  
// PUT API para actualizar los datos de los clientes por Id
router.put('/update/:id', (req, res) => {
  const customerId = req.params.id;
  const formData = req.body; 
  const sql = 'UPDATE customers SET name = ?, email = ?, cell = ? WHERE id = ?';
  connection.query(sql, [formData.nameUser, formData.email, formData.celphoneNumber, customerId], (err, result) => {
    if (err) {
      console.error('Error actualizando los datos en el servidor:', err);
      return res.status(500).json({ error: 'Error actualizando los datos en el servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    return res.status(200).json({ message: 'Cliente actualizado con éxito' });
  });
});

module.exports = router;