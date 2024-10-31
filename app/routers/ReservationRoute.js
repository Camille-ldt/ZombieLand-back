import express from 'express';
import { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../controllers/ReservationController.js';


export const router = express.Router();

router.get('/', getAllReservations);

router.get('/booking/:id', getReservationById);

router.post('/booking', createReservation);

router.patch('/:id/modify', updateReservation);

router.delete('/:id/delete', deleteReservation);