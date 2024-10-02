const { Router } = require('express');
const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const passport = require('../utils/localAuth.js');
const { deleteUser, getUsers, generateRegistrationToken } = require('../controllers/userController');
const { isSuperAdmin } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, FRONTEND_URL } = process.env;
const { sendEmail } = require('../utils/nodemailer.js');
const crypto = require('crypto');

const router = Router();

router.get('/', getUsers);

router.post('/register-superadmin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existAdmin = await User.findOne({ where: { role: 'superAdmin' } });
    if(existAdmin) {
      return res.status(403).json({ message: 'SuperAdmin already exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'superAdmin',
    })
    res.status(201).json({ message: 'User created', user });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register/:token', async (req, res) => {
  const { token } = req.params;
  const { email, password } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: decoded.name,
      email,
      password: hashedPassword,
      role: 'admin',
    });
    res.status(201).json({ message: 'Admin created', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('User:', user);
    if(err) {
      console.log(err);
      return res.status(500).json({ message: 'Error en la autenticación', error: err });
    }
    if(!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas', info });
    }
    req.login(user, { session: false }, (err) => {
      if(err) {
        return res.status(500).json({ message: 'Error en la autenticación', error: err });
      }
      return res.status(200).json({ message: 'Usuario autenticado', token: info.token, user });
    });
  })(req, res, next);
});

router.post('/generate-token', generateRegistrationToken);

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = jwt.sign({ id: user.id, token }, JWT_SECRET, { expiresIn: '1h' });

    const resetUrl = `${FRONTEND_URL}/dashboard/reset-password/${resetPasswordToken}`;
    const subject = 'Recuperación de contraseña';
    const text = `Para restablecer su contraseña, haga clic en el siguiente enlace: ${resetUrl}`;

    await sendEmail(email, subject, text);

    res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.update({ password: hashedPassword }, { where: { id: decoded.id } });

    res.status(200).json({ message: 'Contraseña restablecida' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.delete('/:id', deleteUser);


module.exports = router;