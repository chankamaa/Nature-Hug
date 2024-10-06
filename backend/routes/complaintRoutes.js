import express from 'express';
import path from 'path'; 

import {
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} from '../controllers/complaintController.js';

const router = express.Router();

router.get('/api/GetComplaints', getComplaints);

router.post('/api/CreateComplaints', createComplaint);

router.use('/pdfs', express.static(path.join(process.cwd(), 'pdfs')));


router.put('/api/UpdateComplaints/:id', updateComplaint);


router.delete('/api/DeleteComplaints/:id', deleteComplaint);

export default router;
