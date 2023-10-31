const nodemailer = require('nodemailer');
const mysql = require('mysql2');

// Función para generar el OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6 dígitos
}

// Función para enviar el OTP
function sendOTPToEmail(email) {
  const otp = generateOTP();

  // Configuración del email 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nicolas@ilab.digital',
      pass: 'bvqirrvixgpdsyvj',
    }
  });

  const mailOptions = {
    from: 'nicolas@ilab.digital',
    to: email,
    subject: 'One-Time Password (OTP) for Registration',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP:', error);
    } else {
      console.log('OTP sent:', info.response);

      // configuración de la base de datos MySQL
      const dbConfig = {
        host: 'demo-umonei-aws.cbg6k7u60pgo.us-east-2.rds.amazonaws.com',
        port: 3306,
        user: 'root',
        password: 'eHrZp*H0358w',
        database: 'db_demo_umonei',
      };

      const connection = mysql.createConnection(dbConfig);

      const query = 'INSERT INTO otp_verification (email, otp) VALUES (?, ?)';
      connection.query(query, [email, otp], (err, result) => {
        if (err) {
          console.error('Error inserting OTP into the database:', err);
        } else {
          console.log('OTP inserted into the database:', result);
        }

        connection.end();
      });
    }
  });

  return otp;
}

module.exports = { sendOTPToEmail };