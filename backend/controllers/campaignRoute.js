import express from 'express';
import CampaignController from '../controllers/campaignController.js';

const router = express.Router();

// Route for creating and sending campaign emails
router.post('/campaigns/send-email', CampaignController.createAndSendCampaignEmail);

export default router;
