require('dotenv').config();
const nodemailer = require('nodemailer');
const { EMAIL_PASSWORD, EMAIL_USER } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: 'mansilla.franco.1@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};


module.exports = sendEmail;