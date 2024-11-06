import express from 'express';
import { login } from '../controllers/AuthController.js';

export const router = express.Router();

// Routes d'authentification
router.use('/', login);


