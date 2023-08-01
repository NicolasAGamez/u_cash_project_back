const nodemailer = require('nodemailer');

function sendVerificationEmail(email, verificationCode) {
  const transporter = nodemailer.createTransport({
    host: 'your-email-host', // e.g., smtp.gmail.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your-email-username',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email-address',
    to: email,
    subject: 'Código de Verificación',
    text: `Tu código de verificación es: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando el email de verificación:', error);
    } else {
      console.log('Email de verificación enviado:', info.response);
    }
  });
}

module.exports = { sendVerificationEmail };