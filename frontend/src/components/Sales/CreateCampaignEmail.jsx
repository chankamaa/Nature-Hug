import React, { useState } from 'react';
import axios from 'axios';
import './CreateCampaignEmail.css';

const CreateCampaignEmail = () => {
    const [campaignName, setCampaignName] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [recipients, setRecipients] = useState('futurehasitha@gmail.com'); // Predefined recipient email for testing

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!campaignName || !emailSubject || !emailContent || !recipients) {
            alert('All fields are required');
            return;
        }

        const recipientList = recipients.split(',');
        const invalidEmails = recipientList.filter(email => !validateEmail(email));

        if (invalidEmails.length > 0) {
            alert(`The following email(s) are invalid: ${invalidEmails.join(', ')}`);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/campaigns/send-email', {
                campaignName,
                emailSubject,
                emailContent,
                recipients: recipientList, // Ensure recipients are an array
            });

            alert(response.data.message);
            // Reset the form
            setCampaignName('');
            setEmailSubject('');
            setEmailContent('');
            setRecipients('futurehasitha@gmail.com'); // Predefine email again
        } catch (error) {
            console.error('Error sending campaign email:', error);
            alert('Error sending campaign email.');
        }
    };

    return (
        <div className='main-002'>
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
                <label>Email Content:</label>
                <div>
                    
                    <label>
                    <textarea
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        required
                    
                    />
                    </label>
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
