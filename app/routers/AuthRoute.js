import express from 'express';
import { login } from '../controllers/AuthController.js';

export const router = express.Router();

// Route d'authentification via email (POST /login)
router.post('/', login);
