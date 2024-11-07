import express from 'express';
import { getAllActivities, getOneActivity, createActivity, updateActivity, deleteActivity, getActivityMultimedia, addMultimediaToActivity, removeMultimediaFromActivity } from '../controllers/ActivityController.js';


export const router = express.Router();

router.get('/', getAllActivities);

router.get('/:id', getOneActivity);

router.post('/', createActivity);

router.put('/:id', updateActivity);

router.delete('/:id', deleteActivity);

router.get('/:activityId/multimedia', getActivityMultimedia);

router.put('/:activityId/multimedia', addMultimediaToActivity);

router.delete('/:activityId/multimedia/:multimediaId', removeMultimediaFromActivity);