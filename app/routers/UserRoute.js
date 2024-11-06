import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser } from '../controllers/UserController.js';

export const router = express.Router();

// GET /users
router.get('/', getAllUsers);

// GET /users//:id
router.get('/:id', getOneUser);

// POST /users
router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);