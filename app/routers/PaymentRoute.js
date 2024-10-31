import express from 'express';
import { getAllPayments, getOnePayment, createPayment, updatePayment, deletePayment } from '../controllers/PaymentController.js';


export const router = express.Router();

router.get('/', getAllPayments);

router.get('/Payment/:id', getOnePayment);

router.post('/Payment', createPayment);

router.patch('/:id/modify', updatePayment);

router.delete('/:id/delete', deletePayment);