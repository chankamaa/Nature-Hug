import express from 'express';
import { getAllSuppliers, addSupplier,getSupplierById,updateSupplier, deleteSupplier } from '../controllers/supplierControllers.js';

const router = express.Router();

router.get('/suppliers/data', getAllSuppliers); 
router.post('/suppliers', addSupplier); 
router.get('/suppliers/:id', getSupplierById);
router.put('/suppliers/:id', updateSupplier);
router.delete('/suppliers/:id', deleteSupplier);

export default router;
