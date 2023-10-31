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
    console.log('Conexión PostVerifyOtp realizada');
  }
});


// POST API para la verificación del OTP
router.post('/otpVerification', (req, res) => {
  const { otp, email } = req.body;

  // Revisar si el OTP corresponde al guardado en la tabla 
  const query = 'SELECT * FROM otp_verification WHERE email = ? AND otp = ?';
  connection.query(query, [email, otp], (err, result) => {
    if (err) {
      console.error('Error checking OTP in the database:', err);
      return res.status(500).json({ verified: false });
    }

    if (result && result.length > 0) {
      return res.status(200).json({ verified: true });
    } else {
      console.error('Error, the OTP was not that:', err);
      return res.status(455).json({ verified: false });
    }
  });
});

module.exports = router;