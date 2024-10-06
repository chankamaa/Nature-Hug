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
            // Ensure recipients are valid email addresses
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
                    user: process.env.EMAIL_USER || 'handamama.pvt@gmail.com', // Sender's email
                    pass: process.env.EMAIL_PASS || 'your-email-password',
                }
            });

            // Email options (from is fixed, to is dynamic)
            const mailOptions = {
                from: 'handamama.pvt@gmail.com', // Sender's email address
                to: recipientList,               // Recipient(s) email
                subject: emailSubject,
                text: emailContent,
                html: `<p>${emailContent}</p>`,  // Use HTML if needed
            };

            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent: ${info.response}`);

            // Respond with success
            res.status(200).json({ message: 'Campaign email sent successfully!' });
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
