import express from 'express';
import { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController.js';


export const router = express.Router();

router.get('/', getAllCategories);

router.get('/category/:id', getOneCategory);

router.post('/category', createCategory);

router.patch('/:id/modify', updateCategory);

router.delete('/:id/delete', deleteCategory);