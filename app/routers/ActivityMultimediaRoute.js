import express from 'express';
import { getActivityMultimedia, addMultimediaToActivity, removeMultimediaFromActivity } from '../controllers/ActivityController.js';

export const router = express.Router();

// Route pour obtenir tous les multimédias des activités
router.get('/:activityId/multimedia', getActivityMultimedia);

// Route pour ajouter un multimédia à une activité
router.put('/:activityId/multimedia', addMultimediaToActivity);

// Route pour supprimer un multimédia d'une activité
router.delete('/:activityId/multimedia/:multimediaId', removeMultimediaFromActivity);

// La route commentée peut être décommentée si nécessaire
// router.get('/activity/:id', getOneActivity)