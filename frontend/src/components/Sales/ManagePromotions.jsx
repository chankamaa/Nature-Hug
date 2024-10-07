import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable plugin
import './PromoCodeList.css';

// Base64 logo data for NATURE HUG logo (replace this with your actual base64 logo if available)
const natureHugLogo = "data:image/png;base64,YOUR_BASE64_STRING_HERE"; // Provide the base64 logo here

const PromoCodeList = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [editingPromo, setEditingPromo] = useState(null); // Track the promotion being edited
    const [error, setError] = useState(null); // To track any errors
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    // Fetch all promo codes on component mount
    useEffect(() => {
        const fetchPromoCodes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/promotions');
                if (Array.isArray(response.data)) {
                    setPromoCodes(response.data);
                } else {
                    setError('Unexpected data format from the server');
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                setError('Error fetching promo codes');
                console.error('Error fetching promo codes:', error);
            }
        };
        fetchPromoCodes();
    }, []);

    // Handle delete promotion
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this promotion?')) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/promotions/del/${id}`);
                if (response.status === 200) {
                    setPromoCodes(promoCodes.filter(promo => promo._id !== id));
                } else {
                    setError('Failed to delete promotion');
                    console.error('Failed to delete promotion:', response);
                }
            } catch (error) {
                setError('Error deleting promotion');
                console.error('Error deleting promotion:', error);
            }
        }
    };

    // Handle editing promotion
    const handleEdit = (promo) => {
        setEditingPromo(promo); // Set the selected promo for editing
    };

    // Handle update promotion
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingPromo) return;
        try {
            const response = await axios.put(`http://localhost:4000/api/promotions/${editingPromo._id}`, editingPromo);
            setPromoCodes(promoCodes.map(promo => promo._id === editingPromo._id ? response.data : promo));
            setEditingPromo(null); // Clear editing state
        } catch (error) {
            setError('Error updating promotion');
            console.error('Error updating promotion:', error);
        }
    };

    // Filter promo codes based on search term
    const filteredPromoCodes = promoCodes.filter(promo =>
        promo.promoCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.promotionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to generate PDF with all promo codes
    const downloadAllCampaignsPDF = () => {
        const doc = new jsPDF();

        // Add company logo and details using base64-encoded image
        const logoWidth = 30; // Adjust the width of the logo
        const logoHeight = 30; // Adjust the height of the logo
        doc.addImage(natureHugLogo, "PNG", 10, 10, logoWidth, logoHeight); // Use base64 image data

        // Add company name and details
        doc.setFontSize(18);
        doc.text("NATURE HUG", 50, 20); // Align company name correctly
        doc.setFontSize(12);
        doc.text("Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara.", 50, 30);
        doc.text("Email: handamama.pvt@gmail.com | Phone: +94 76 258 2337", 50, 35);

        // Leave space between header and promo code data table
        doc.setFontSize(16);
        doc.text("All Promo Codes Report", 14, 50); // Title of the table section

        // Define table columns and rows
        const tableColumn = ["Promo Code", "Promotion Name", "Discount Percentage", "Start Date", "End Date"];
        const tableRows = [];

        promoCodes.forEach((promo) => {
            const promoData = [
                promo.promoCode,
                promo.promotionName,
                promo.discountPercentage + "%",
                new Date(promo.startDate).toLocaleDateString(),
                new Date(promo.endDate).toLocaleDateString()
            ];
            tableRows.push(promoData);
        });

        // Add table to the PDF starting from (X=14, Y=60) to leave space after the header
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 60, // Start position of the table
        });

        // Save the generated PDF
        doc.save("All_Promo_Codes.pdf");
    };

    return (
        <div className="promo-code-list">
            <h2>All Promo Codes</h2>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by Promo Code or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            {/* Download PDF Button */}
            <button onClick={downloadAllCampaignsPDF}>Download PDF</button>

            {/* Display any error messages */}
            {error && <p className="error-message">{error}</p>}

            {filteredPromoCodes.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Promo Code</th>
                            <th>Promotion Name</th>
                            <th>Discount Percentage</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPromoCodes.map((promo) => (
                            <tr key={promo._id}>
                                <td>{promo.promoCode}</td>
                                <td>{promo.promotionName}</td>
                                <td>{promo.discountPercentage}%</td>
                                <td>{new Date(promo.startDate).toLocaleDateString()}</td>
                                <td>{new Date(promo.endDate).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(promo)}>Edit</button>
                                    <button onClick={() => handleDelete(promo._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No promo codes available.</p>
            )}

            {/* Edit Promotion Form */}
            {editingPromo && (
                <div className="edit-promo-form">
                    <h3>Edit Promotion</h3>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Promotion Name</label>
                            <input
                                type="text"
                                value={editingPromo.promotionName}
                                onChange={(e) => setEditingPromo({ ...editingPromo, promotionName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Discount Percentage</label>
                            <input
                                type="number"
                                value={editingPromo.discountPercentage}
                                onChange={(e) => setEditingPromo({ ...editingPromo, discountPercentage: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <input
                                type="date"
                                value={new Date(editingPromo.startDate).toISOString().split('T')[0]}
                                onChange={(e) => setEditingPromo({ ...editingPromo, startDate: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>End Date</label>
                            <input
                                type="date"
                                value={new Date(editingPromo.endDate).toISOString().split('T')[0]}
                                onChange={(e) => setEditingPromo({ ...editingPromo, endDate: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit">Update Promotion</button>
                        <button type="button" onClick={() => setEditingPromo(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PromoCodeList;
