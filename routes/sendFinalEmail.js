const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Función para enviar el correo de agradecimiento
function sendThankYouEmail(email) {
  // Configura las credenciales SMTP con tu proveedor de correo electrónico
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nicolas@ilab.digital', // Reemplaza con tu dirección de correo electrónico de Gmail
      pass: 'bvqirrvixgpdsyvj', // Reemplaza con tu contraseña de la aplicación Gmail
    },
  });

  const mailOptions = {
    from: 'nicolas@ilab.digital',
    to: email,
    subject: '¡Gracias por confiar en U-monei para tu alivio financiero!',
    text: `
    Estimado cliente valioso,

    Esperamos que este mensaje te encuentre en excelente estado. En U-monei, estamos encantados de tenerte como parte de nuestra familia financiera y queremos expresar nuestro más sincero agradecimiento por haber completado tu solicitud de alivio financiero con nosotros.

    Sabemos que tomar la decisión de buscar ayuda financiera es un paso importante, y estamos aquí para apoyarte en cada etapa del proceso. Valoramos tu confianza en nosotros y nos comprometemos a brindarte el mejor servicio posible para satisfacer tus necesidades financieras.

    En U-monei, no solo te ofrecemos soluciones financieras, sino que también nos esforzamos por mantener una relación sólida y duradera contigo. Creemos en la importancia de escuchar a nuestros clientes y adaptar nuestros servicios para brindarte la mejor experiencia posible.

    Si en algún momento tienes preguntas, inquietudes o necesitas más información sobre tu solicitud de alivio financiero, no dudes en contactarnos. Nuestro equipo de expertos estará encantado de ayudarte en todo momento.

    Además, queremos recordarte que en U-monei siempre estamos buscando formas de recompensar a nuestros clientes leales. Mantente atento a futuras ofertas exclusivas y ventajas adicionales que podríamos tener preparadas para ti.

    Una vez más, gracias por elegir a U-monei. Tu satisfacción y bienestar financiero son nuestra máxima prioridad. Esperamos poder servirte de la mejor manera posible y esperamos que esta sea la primera de muchas interacciones positivas.

    ¡Gracias por confiar en nosotros!

    Atentamente,
    U-monei - Tu socio financiero de confianza
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el email de agradecimiento:', error);
    } else {
      console.log('Email de agradecimiento enviado:', info.response);
    }
  });
}

// Endpoint para enviar el correo de agradecimiento
router.post('/enviar-correo-agradecimiento', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Se requiere una dirección de correo electrónico.' });
  }

  sendThankYouEmail(email);

  return res.status(200).json({ message: 'Correo de agradecimiento enviado con éxito.' });
});

module.exports = router;