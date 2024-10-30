import express from 'express';
import { getAllRoles, getRole, createRole, updateRole, deleteRole } from '../controllers/RoleController.js';

export const router = express.Router();

router.get('/', getAllRoles);

router.get('/:id', getRole);

router.post('/role', createRole);

router.patch ('/:id/modify', updateRole);

router.delete ('/:id/delete', deleteRole);