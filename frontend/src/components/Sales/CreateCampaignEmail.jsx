import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateCampaignEmail.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import natureHugLogo from "../../../public/nature-hug-logo-base64.js"; // Import the base64-encoded image

const CreateCampaignEmail = () => {
    const [campaignName, setCampaignName] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailContent, setEmailContent] = useState("");
    const [recipients, setRecipients] = useState("futurehasitha@gmail.com"); // Predefined recipient email for testing
    const [campaigns, setCampaigns] = useState([]); // State to store sent campaigns
    const [editingCampaign, setEditingCampaign] = useState(null); // Track the campaign being edited

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Fetch campaigns from the backend
    const fetchCampaigns = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/campaigns/campaigns"
            );
            setCampaigns(response.data); // Update state with fetched campaigns
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };

    // Handle form submission (Create or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!campaignName || !emailSubject || !emailContent || !recipients) {
            alert("All fields are required");
            return;
        }

        const recipientList = recipients.split(",");
        const invalidEmails = recipientList.filter(
            (email) => !validateEmail(email)
        );

        if (invalidEmails.length > 0) {
            alert(`The following email(s) are invalid: ${invalidEmails.join(", ")}`);
            return;
        }

        if (editingCampaign) {
            // Update existing campaign
            try {
                const response = await axios.put(
                    `http://localhost:4000/api/campaigns/${editingCampaign._id}`,
                    {
                        campaignName,
                        emailSubject,
                        emailContent,
                        recipients: recipientList,
                    }
                );
                alert(response.data.message);
                setEditingCampaign(null); // Clear editing state
                setCampaignName("");
                setEmailSubject("");
                setEmailContent("");
                setRecipients("futurehasitha@gmail.com");
                fetchCampaigns(); // Refresh the campaign list
            } catch (error) {
                console.error("Error updating campaign:", error);
            }
        } else {
            // Create new campaign
            try {
                const response = await axios.post(
                    "http://localhost:4000/api/campaigns/send-email",
                    {
                        campaignName,
                        emailSubject,
                        emailContent,
                        recipients: recipientList,
                    }
                );
                alert(response.data.message);
                setCampaignName("");
                setEmailSubject("");
                setEmailContent("");
                setRecipients("futurehasitha@gmail.com");
                fetchCampaigns(); // Refresh the campaign list after sending
            } catch (error) {
                console.error("Error sending campaign email:", error);
            }
        }
    };

    // Handle delete campaign
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this campaign?")) {
            try {
                const response = await axios.delete(
                    `http://localhost:4000/api/campaigns/${id}`
                );
                if (response.status === 200) {
                    alert("Campaign deleted successfully!");
                    fetchCampaigns(); // Refresh the campaign list after deletion
                } else {
                    alert("Failed to delete campaign.");
                }
            } catch (error) {
                console.error("Error deleting campaign:", error);
            }
        }
    };

    // Handle edit campaign
    const handleEdit = (campaign) => {
        setCampaignName(campaign.campaignName);
        setEmailSubject(campaign.emailSubject);
        setEmailContent(campaign.emailContent);
        setRecipients(campaign.recipients.join(", "));
        setEditingCampaign(campaign); // Set the campaign for editing
    };
    
    
    // Function to generate PDF with all campaigns
const downloadAllCampaignsPDF = () => {
    const doc = new jsPDF();

    // Add company logo and details using base64-encoded image
    const logoWidth = 30; // Adjust the width of the logo
    const logoHeight = 30; // Adjust the height of the logo

    // Adjust your base64 logo data to this image parameter
    doc.addImage(natureHugLogo, "PNG", 10, 10, logoWidth, logoHeight); // Use base64 image data

    // Add company name and details
    doc.setFontSize(18);
    doc.text("NATURE HUG", 50, 20); // Align company name correctly
    doc.setFontSize(12);
    doc.text("Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara.", 50, 30);
    doc.text("Email: handamama.pvt@gmail.com | Phone: +94 76 258 2337", 50, 35);

    // Leave space between header and campaign data table
    doc.setFontSize(16);
    doc.text("All Campaigns Report", 14, 50); // Title of the table section

    // Define table columns and rows
    const tableColumn = ["Campaign Name", "Email Subject", "Email Content", "Recipients", "Status"];
    const tableRows = [];

    campaigns.forEach((campaign) => {
        const campaignData = [
            campaign.campaignName,
            campaign.emailSubject,
            campaign.emailContent,
            campaign.recipients.join(", "),
            campaign.status,
        ];
        tableRows.push(campaignData);
    });

    // Add table to the PDF starting from (X=14, Y=60) to leave space after the header
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60, // Start position of the table
    });

    // Save the generated PDF
    doc.save("All_Campaigns.pdf");
};


    useEffect(() => {
        fetchCampaigns(); // Fetch campaigns when the component mounts
    }, []);

    return (
        <div className="main-002">
            <h2>
                {editingCampaign ? "Edit Campaign" : "Create and Send Campaign Email"}
            </h2>
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
                <button type="submit">
                    {editingCampaign ? "Update Campaign" : "Send Campaign Email"}
                </button>
            </form>

            {/* Campaigns Table */}
            <h3>Sent Campaigns</h3>
            <table>
                <thead>
                    <tr>
                        <th>Campaign Name</th>
                        <th>Email Subject</th>
                        <th>Recipients</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign._id}>
                            <td>{campaign.campaignName}</td>
                            <td>{campaign.emailSubject}</td>
                            <td>{campaign.recipients.join(", ")}</td>
                            <td>{campaign.status}</td>
                            <td>
                                <button onClick={() => handleEdit(campaign)}>Edit</button>
                                <button onClick={() => handleDelete(campaign._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={downloadAllCampaignsPDF}>
                Download All Campaigns as PDF
            </button>
        </div>
    );
};

export default CreateCampaignEmail;
