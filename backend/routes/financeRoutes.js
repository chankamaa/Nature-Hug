import express from 'express';
import { getTotalSalaries, getTotalEPF, getTotalETF } from '../controllers/financeController.js';

const router = express.Router();

// Route to get total salaries
router.get('/finance/total-salaries', getTotalSalaries);

// Route to get total EPF contributions
router.get('/finance/total-epf', getTotalEPF);

// Route to get total ETF contributions
router.get('/finance/total-etf', getTotalETF);

export default router;
