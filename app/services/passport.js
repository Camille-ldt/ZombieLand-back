import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User.js';

// JWT options
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token
    secretOrKey: process.env.JWT_SECRET, // Secret key
    issuer: 'zombieland-back.auth.com', // Token issuer
    audience: 'zombieland-users', // Token audience
    algorithms: ['HS256'], // Algorithm
};

// Use JWT strategy
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findByPk(jwt_payload.id); // Find user by ID
            if (user) {
                return done(null, user); // User found
            }
            return done(null, false); // User not found
        } catch (err) {
            return done(err, false); // Error handling
        }
    })
);

export default passport;
