import express from 'express';
import { router as indexRouter } from './routers/indexRouter.js';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/', indexRouter);

// Middleware global pour gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur non gérée:', err);
    res.status(500).json({ message: 'Erreur serveur' });
});

export default app;
