import express from 'express';
import { getAllPeriods, getOnePeriod, createPeriod, updatePeriod, deletePeriod } from '../controllers/PeriodController.js';


export const router = express.Router();

router.get('/', getAllPeriods);

router.get('/period/:id', getOnePeriod);

router.post('/period', createPeriod);

router.patch('/:id/modify', updatePeriod);

router.delete('/:id/delete', deletePeriod);