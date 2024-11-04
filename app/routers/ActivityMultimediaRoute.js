import express from 'express';
import { getAllActivityMultimedia, addMultimediaToActivity, deleteActivityMultimedia } from '../controllers/ActivityMultimediaController.js';


export const router = express.Router();

router.get('/', getAllActivityMultimedia);

// router.get('/activity/:id', getOneActivity);

router.post('/:activityId/:multimediaId', addMultimediaToActivity);

router.delete('/:activityId/:multimediaId/delete', deleteActivityMultimedia);