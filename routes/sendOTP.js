const nodemailer = require('nodemailer');
const mysql = require('mysql2');

// Function to generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

// Function to send OTP via email
function sendOTPToEmail(email) {
  const otp = generateOTP();

  // Replace these SMTP configurations with your own email provider settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nicolas@ilab.digital', // Replace with your Gmail email address
      pass: 'bvqirrvixgpdsyvj', // Replace with your Gmail app password
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

      // Insert the OTP and email into the OTP verification table
      const dbConfig = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'eHrZp*H0358w',
        database: 'u_cash_customers',
      };

      const connection = mysql.createConnection(dbConfig);

      const query = 'INSERT INTO otp_verification (email, otp) VALUES (?, ?)';
      connection.query(query, [email, otp], (err, result) => {
        if (err) {
          console.error('Error inserting OTP into the database:', err);
        } else {
          console.log('OTP inserted into the database:', result);
        }

        connection.end(); // Close the database connection
      });
    }
  });

  return otp;
}

module.exports = { sendOTPToEmail };