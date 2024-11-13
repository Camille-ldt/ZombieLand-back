import express from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser } from '../controllers/UserController.js';

export const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getOneUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);
