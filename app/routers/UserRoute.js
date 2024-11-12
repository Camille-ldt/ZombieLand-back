// File Path: routes/UserRoutes.js

import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser, getCurrentUser } from '../controllers/UserController.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';

export const router = express.Router();

// Route pour obtenir les informations de l'utilisateur connecté (à sécuriser avec JWT)
router.get('/me', authenticateJWT, getCurrentUser);

// Route pour obtenir tous les utilisateurs (à sécuriser)
router.get('/', authenticateJWT, getAllUsers);

// Route pour obtenir un utilisateur par ID (à sécuriser)
router.get('/:id', authenticateJWT, getOneUser);

// Route pour créer un nouvel utilisateur
router.post('/', createUser);

// Route pour mettre à jour un utilisateur (à sécuriser)
router.patch('/:id', authenticateJWT, updateUser);

// Route pour supprimer un utilisateur (à sécuriser)
router.delete('/:id', authenticateJWT, deleteUser);
