import express from 'express';
import {getAllReviews, getReviewById, createReview, updateReview, deleteReview} from '../controllers/ReviewController.js';

export const router = express.Router();

// Route to get all reviews (Route pour obtenir toutes les réservations)
router.get('/', getAllReviews);

// Route to get a single review by ID (Route pour obtenir une réservation)
router.get('/:id', getReviewById);

// Route to create a new review (Route pour créer une réservation)
router.post('/', createReview);

// Route to update an existing review by ID (Route pour mettre à jours une réservation)
router.patch('/:id', updateReview);

// Route to delete a review by ID (Route pour supprimer une réservation)
router.delete('/:id', deleteReview);

