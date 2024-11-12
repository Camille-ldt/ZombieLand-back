// File: app/services/passport.js

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User.js';

// JWT options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrait le token de l'en-tête
  secretOrKey: process.env.JWT_SECRET, // Clé secrète (assurez-vous qu'elle est définie)
  algorithms: ['HS256'], // Algorithme de signature
};

// Utilisation de la stratégie JWT
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id); // Recherche l'utilisateur par ID
      if (user) {
        return done(null, user); // Utilisateur trouvé
      }
      return done(null, false); // Utilisateur non trouvé
    } catch (err) {
      return done(err, false); // Gestion des erreurs
    }
  })
);

export default passport;
