import { createPdf, fetchPdf } from '../controllers/allUserDoc.js';
import express from 'express';

const router = express.Router();

router.post("/createpdf", createPdf);
router.get("/fetchpdf", fetchPdf);

export default router;
