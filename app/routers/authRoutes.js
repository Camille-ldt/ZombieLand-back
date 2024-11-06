import express from 'express';
import { Registrer, Login } from '../controllers/authController.js'; // Assurez-vous que les noms sont corrects

const router = express.Router();

// Route pour l'inscription
router.post('/register', Registrer);

// Route pour la connexion
router.post('/login', Login);

export default router;
