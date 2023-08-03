const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { sendOTPToEmail } = require('./sendOTP'); // Import the sendOTP function


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
    console.log('Conexión con el servidor VERIFY MySQL realizada!');
  }
});


// API endpoint for OTP verification
router.post('/otpVerification', (req, res) => {
  const { otp, email } = req.body;

  // Check if the email and OTP exist in the otp_verification table
  const query = 'SELECT * FROM otp_verification WHERE email = ? AND otp = ?';
  connection.query(query, [email, otp], (err, result) => {
    if (err) {
      console.error('Error checking OTP in the database:', err);
      return res.status(500).json({ verified: false });
    }

    if (result && result.length > 0) {
      // OTP verification successful
      // In your actual implementation, you can update the user's record to mark their email as verified
      return res.status(200).json({ verified: true });
    } else {
      // OTP verification failed
      return res.status(400).json({ verified: false });
    }
  });
});

module.exports = router;