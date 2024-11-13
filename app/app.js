import express from 'express';
import { router as indexRouter } from './routers/indexRouter.js';
import passport from './services/passport.js';
import cors from 'cors';

const app = express();

// Middleware pour analyser le JSON des requêtes
app.use(express.json({ limit: '50mb' }));

app.use(passport.initialize());

// Middleware pour autoriser les requêtes CORS provenant du front-end (port 5173)
app.use(cors({ origin: 'http://localhost:5173' }));

// Utilisation du routeur principal
app.use('/', indexRouter);

// Middleware global pour gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur non gérée:', err);
    res.status(500).json({ message: 'Erreur serveur' });
});

export default app;
