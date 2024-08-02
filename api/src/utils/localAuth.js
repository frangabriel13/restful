const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async(email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if(!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if(!isValid) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user, { message: 'Usuario autenticado' })
    } catch(error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch(error) {
    done(error);
  }
});


module.exports = passport;