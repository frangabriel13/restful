require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email }});
      console.log('User:', user);
      if(!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if(!isValid) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      return done(null, user, { message: 'Usuario autenticado', token });
    } catch(error) {
      return done(error);
    }
  })
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch(error) {
      return done(error, false);
    }
  })
);


module.exports = passport;