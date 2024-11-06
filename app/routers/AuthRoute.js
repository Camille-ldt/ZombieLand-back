// AuthRoute.js
import express from 'express';
import { login, updatePassword } from '../controllers/AuthController.js';


export const router = express.Router();

// Route d'authentification via email
router.post('/login', login);

// Route pour la mise à jour du mot de passe
router.patch('/update-password/:id', updatePassword);

export default router;
