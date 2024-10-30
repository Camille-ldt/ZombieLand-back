import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser } from '../controllers/UserController.js';

export const router = express.Router();

// Route to get all users (Route pour obtenir tous les utilisateurs)
router.get('/', getAllUsers);

// Route to get a single user by ID (Route pour obtenir un utilisateur spécifique par ID)
router.get('/user/:id', getOneUser);

// Route to create a new user (Route pour créer un nouvel utilisateur)
router.post('/user', createUser);

// Route to update an existing user by ID (Route pour mettre à jour un utilisateur existant par ID)
router.patch('/:id/modify', updateUser);

// Route to delete a user by ID (Route pour supprimer un utilisateur par ID)
router.delete('/:id/delete', deleteUser);
