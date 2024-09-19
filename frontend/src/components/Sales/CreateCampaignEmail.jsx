import React, { useState } from 'react';
import axios from 'axios';
import './CreateCampaignEmail.css'


const CreateCampaignEmail = () => {
    const [campaignName, setCampaignName] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [recipients, setRecipients] = useState(''); // Comma-separated list of emails

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/campaigns/send-email', {
                campaignName,
                emailSubject,
                emailContent,
                recipients: recipients.split(','), // Convert string to array of emails
            });

            alert(response.data.message);
            // Reset the form
            setCampaignName('');
            setEmailSubject('');
            setEmailContent('');
            setRecipients('');
        } catch (error) {
            console.error('Error sending campaign email:', error);
            alert('Error sending campaign email.');
        }
    };

    return (
        <div>
            <h2>Create and Send Campaign Email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Campaign Name:</label>
                    <input
                        type="text"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email Subject:</label>
                    <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email Content:</label>
                    <textarea
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Recipients (comma-separated):</label>
                    <input
                        type="text"
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Campaign Email</button>
            </form>
        </div>
    );
};

export default CreateCampaignEmail;
