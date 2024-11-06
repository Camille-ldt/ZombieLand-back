import passport from 'passport';

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error during authentication' }); // (Erreur de serveur lors de l'authentification)
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access' }); // (Accès non autorisé)
    }

    req.user = user; // Attach user to request (Attacher l'utilisateur à la requête)
    return next(); // Proceed to the next middleware (Passer au middleware suivant)
  })(req, res, next);
};

export default authenticateJWT;
