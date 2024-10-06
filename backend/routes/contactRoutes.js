import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';
import { submitFeedback } from '../controllers/FeedbackController.js';

const router = express.Router();

// Route to handle contact form submission
router.post('/contact', sendContactEmail);
router.post('/CreateFeedback', submitFeedback);

export default router;
