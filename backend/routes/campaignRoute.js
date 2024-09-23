import express from 'express';
import CampaignController from '../controllers/campaignController.js';

const router = express.Router();

// POST route to send campaign email
//router.post('/campaigns/send-email', CampaignController.createAndSendCampaignEmail);
router.post('/send-email', CampaignController.createAndSendCampaignEmail);

export default router;
