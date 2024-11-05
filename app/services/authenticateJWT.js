import passport from 'passport';

// Middleware pour authentifier les requêtes en utilisant JWT
const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de serveur lors de l\'authentification' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }

    // Ajouter l'utilisateur à la requête pour qu'il soit accessible dans le prochain middleware/route
    req.user = user;
    return next();
  })(req, res, next);
};

export default authenticateJWT;
