import express from 'express';
import { forgotPassword } from '../controllers/PasswordController.js';

const router = express.Router();

// Récupération de mot de passe
router.post('/forgot-password', forgotPassword);

export default router;
