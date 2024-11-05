import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Registrer, Login } from '../controllers/authController.js';

const router = express.Router();

// Inscription
router.post('/register', Registrer);

// Connexion
router.post('/login', Login);

export default router;
