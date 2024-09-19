import nodemailer from 'nodemailer';
import Campaign from '../models/Campaign.js'; // Assuming you have a Campaign model

class CampaignController {
    // Create and send marketing email
    static async createAndSendCampaignEmail(req, res) {
        const { campaignName, emailSubject, emailContent, recipients } = req.body;

        try {
            // Save the campaign in the database (if needed)
            const newCampaign = new Campaign({ campaignName, emailSubject, emailContent });
            await newCampaign.save();

            // Configure the email transport
            const transporter = nodemailer.createTransport({
                service: 'Gmail', // You can use another email provider if necessary
                auth: {
                    user: 'your-email@gmail.com', // Your email
                    pass: 'your-email-password' // Your email password or app-specific password
                }
            });

            // Email options
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: recipients, // Array of recipient emails
                subject: emailSubject,
                text: emailContent, // Plain text content
                html: `<p>${emailContent}</p>` // HTML content if needed
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Campaign email sent successfully!' });
        } catch (err) {
            console.error('Error sending campaign email:', err);
            res.status(500).json({ message: 'Error sending campaign email' });
        }
    }
}

export default CampaignController;
