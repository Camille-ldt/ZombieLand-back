// config/passport.js
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User.js'; // Importez votre modèle User

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
  issuer: 'zombieland-back.auth.com', // Ajout de l'émetteur
  audience: 'zombieland-users',       // Ajout de l'audience
  algorithms: ['HS256'],              // Limitation des algorithmes autorisés
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if (user && user.isActive) { // Vérification de l'état actif de l'utilisateur
        return done(null, user);
      }
      return done(null, false, { message: 'User not found or inactive' });
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
