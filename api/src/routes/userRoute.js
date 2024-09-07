const { Router } = require('express');
const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { deleteUser, getUsers, generateRegistrationToken } = require('../controllers/userController');
const { isSuperAdmin } = require('../middlewares/authMiddleware');

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

router.post('/register-token', passport.authenticate('jwt', { session: false }), isSuperAdmin, generateRegistrationToken);

router.delete('/:id', deleteUser);


module.exports = router;