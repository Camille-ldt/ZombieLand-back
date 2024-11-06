// Fichier : app/routers/UserRoute.js

import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser } from '../controllers/UserController.js';

const router = express.Router();

// Route pour obtenir tous les utilisateurs
router.get('/', getAllUsers);

// Route pour obtenir un utilisateur spécifique par ID
router.get('/:id', getOneUser);

// Route pour créer un nouvel utilisateur
router.post('/', createUser);

// Route pour mettre à jour un utilisateur existant par ID
router.patch('/:id', updateUser);

// Route pour supprimer un utilisateur par ID
router.delete('/:id', deleteUser);

export default router;
