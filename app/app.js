import express from 'express';
import userRouter from './routers/UserRoute.js';
import authRouter from './routers/authRoutes.js';
import passport from './services/passport.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(passport.initialize());

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Middleware global pour gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur non gérée:', err);
    res.status(500).json({ message: 'Erreur serveur' });
});

export default app; // Export de l'application Express
