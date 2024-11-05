import express from 'express';
import { getAllActivities, getOneActivity, createActivity, updateActivity, deleteActivity, getActivityMultimedia, addMultimediaToActivity, removeMultimediaFromActivity } from '../controllers/ActivityController.js';


export const router = express.Router();

router.get('/', getAllActivities);

router.get('/activity/:id', getOneActivity);

router.post('/activity', createActivity);

router.patch('/:id/modify', updateActivity);

router.delete('/:id/delete', deleteActivity);

router.get('/:activityId/multimedia', getActivityMultimedia);

router.put('/:activityId/multimedia', addMultimediaToActivity);

router.delete('/:activityId/multimedia/:multimediaId', removeMultimediaFromActivity);