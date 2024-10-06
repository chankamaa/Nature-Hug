import express from 'express';
import CampaignController from '../controllers/campaignController.js';

const router = express.Router();

// POST route to send campaign email
router.post('/send-email', CampaignController.createAndSendCampaignEmail);

// PUT route to update a campaign by ID
router.put('/:id', CampaignController.updateCampaign);

// DELETE route to delete a campaign by ID
router.delete('/:id', CampaignController.deleteCampaign);

// GET route to fetch all campaigns
router.get('/campaigns', CampaignController.getAllCampaigns);

export default router;
