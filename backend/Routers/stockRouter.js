import express from 'express';
import { getAllStocks, addStock, updateStock, deleteStock } from '../Controller/stockcontroller.js';

const router = express.Router();


router.get('/stocks', getAllStocks);

router.post('/stocks', addStock);

router.put('/stocks/:id', updateStock);

router.delete('/stocks/:id', deleteStock);

export default router;
