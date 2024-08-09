const { Router } = require('express');
const { sendEmail } = require('../utils/nodemailer');

const router = Router();

router.post('/send-email', async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    sendEmail(email, subject, text);
    res.send('Email enviado correctamente');
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;