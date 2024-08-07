const { Router } = require('express');
const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = Router();

router.get('/', async (req, res) => {
  res.send('Hello World');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    })
    res.status(201).json({ message: 'User created', user });
  } catch(error) {
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
      return res.status(200).json({ message: 'Usuario autenticado', token: info.token });
    });
  })(req, res, next);
});


module.exports = router;