import express from 'express';
import { getAllSuppliers, addSupplier,getSupplierById,updateSupplier, deleteSupplier } from '../Controller/supplierControllers.js';

const router = express.Router();

router.get('/suppliers/data', getAllSuppliers); // Fetch all suppliers
router.post('/suppliers', addSupplier); // Add a new supplier
router.get('/suppliers/:id', getSupplierById);
router.put('/suppliers/:id', updateSupplier);
router.delete('/suppliers/:id', deleteSupplier);
export default router;
