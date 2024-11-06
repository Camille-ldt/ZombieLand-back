import express from 'express';
import { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../controllers/ReservationController.js';


export const router = express.Router();

router.get('/', getAllReservations);

router.get('/:id', getReservationById);

router.post('/', createReservation);

router.patch('/:id', updateReservation);

router.delete('/:id', deleteReservation);