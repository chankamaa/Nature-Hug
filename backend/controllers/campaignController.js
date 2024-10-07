import nodemailer from 'nodemailer';
import Campaign from '../models/Campaign.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class CampaignController {
    static async createAndSendCampaignEmail(req, res) {
        const { campaignName, emailSubject, emailContent, recipients } = req.body;

        // Check if all required fields are provided
        if (!campaignName || !emailSubject || !emailContent || !recipients) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const recipientList = Array.isArray(recipients) ? recipients : recipients.split(',');
            if (!recipientList.every(email => validateEmail(email))) {
                return res.status(400).json({ message: 'Invalid recipient email(s).' });
            }

            // Save the campaign to the database
            const newCampaign = new Campaign({ campaignName, emailSubject, emailContent, recipients: recipientList });
            await newCampaign.save();

            // Configure the email transport
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER || 'handamama.pvt@gmail.com',
                    pass: process.env.EMAIL_PASS || 'lhjhvwptabybkums',
                }
            });

            const mailOptions = {
                from: 'handamama.pvt@gmail.com',
                to: recipientList,
                subject: emailSubject,
                text: emailContent,
                html: `<p>${emailContent}</p>`,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent: ${info.response}`);

            res.status(200).json({ message: 'Campaign email sent successfully!' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Update Campaign by ID
    static async updateCampaign(req, res) {
        const { id } = req.params;
        const { campaignName, emailSubject, emailContent, recipients } = req.body;

        try {
            const updatedCampaign = await Campaign.findByIdAndUpdate(
                id,
                { campaignName, emailSubject, emailContent, recipients },
                { new: true }
            );

            if (!updatedCampaign) {
                return res.status(404).json({ message: 'Campaign not found' });
            }

            res.status(200).json({ message: 'Campaign updated successfully', updatedCampaign });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Delete Campaign by ID
    static async deleteCampaign(req, res) {
        const { id } = req.params;

        try {
            const deletedCampaign = await Campaign.findByIdAndDelete(id);

            if (!deletedCampaign) {
                return res.status(404).json({ message: 'Campaign not found' });
            }

            res.status(200).json({ message: 'Campaign deleted successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Fetch all campaigns
    static async getAllCampaigns(req, res) {
        try {
            const campaigns = await Campaign.find();
            res.status(200).json(campaigns);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export default CampaignController;
