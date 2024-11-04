import express from 'express';
import { getAllActivityMultimedia, addMultimediaToActivity, deleteActivityMultimedia } from '../controllers/ActivityMultimediaController.js';

export const router = express.Router();

// Route pour obtenir tous les multimédias des activités
router.get('/multimedia', getAllActivityMultimedia);

// Route pour ajouter un multimédia à une activité
router.put('/:activityId/multimedia', addMultimediaToActivity);

// Route pour supprimer un multimédia d'une activité
router.delete('/:activityId/multimedia/:multimediaId', deleteActivityMultimedia);

// La route commentée peut être décommentée si nécessaire
// router.get('/activity/:id', getOneActivity);