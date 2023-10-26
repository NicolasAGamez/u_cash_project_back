const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

router.use(bodyParser.json());

// Función para enviar el correo de agradecimiento
function sendThankYouEmail(email, email_name) {
  
  // Configurar las credenciales SMTP con tu proveedor de correo electrónico
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'somos@umonei.com',
      pass: '#umonei2023*_',
    },
  });

  const mailOptions = {
    from: 'somos@umonei.com',
    to: email,
    subject: '¡Gracias por confiar en U-monei para tu alivio financiero!',
    text: `
    Estimado, ${email_name}
    
    ¡Gracias por completar tu solicitud de alivio financiero con nosotros!
    
    En 24 horas hábiles recibirás, de ser aprobada tu solicitud, la confirmación de la misma para proceder con la firma de tu contrato y proceder con el desembolso de tu alivio.
    
    Te invitamos a estar pendiente de tus notificaciones de correo. ¡Nos vemos pronto!

    Atentamente,
    U-monei - Tu socio financiero de confianza
    `,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error('Error al enviar el email de agradecimiento:', error);
    } else {
      console.log('Email de agradecimiento enviado:', info.response);
    }
  });
}

// POST API para enviar el correo de agradecimiento
router.post('/enviar-correo-agradecimiento', (req, res) => {
  const { email, email_name } = req.body; 
  if (!email || !email_name) { 
    return res.status(400).json({ error: 'Se requieren una dirección de correo electrónico y el nombre.' });
  }

  sendThankYouEmail(email, email_name); 

  return res.status(200).json({ message: 'Correo de agradecimiento enviado con éxito.' });
});

module.exports = router;