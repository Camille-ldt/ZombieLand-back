import express from 'express';
import { getAllActivities, getOneActivity, createActivity, updateActivity, deleteActivity } from '../controllers/ActivityController.js';


export const router = express.Router();

router.get('/', getAllActivities);

router.get('/activity/:id', getOneActivity);

router.post('/activity', createActivity);

router.patch('/:id/modify', updateActivity);

router.delete('/:id/delete', deleteActivity);