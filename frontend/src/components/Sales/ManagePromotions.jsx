import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { jsPDF } from 'jspdf'; // Import jsPDF
import './ManagePromotions.css'; // Import the separate CSS file

const ManagePromotions = () => {
    const [promotionName, setPromotionName] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Define the today variable here
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Function to generate random promo code
    const generatePromoCode = () => {
        const code = Math.random().toString(36).substr(2, 8).toUpperCase();
        setPromoCode(code);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ensure all required fields are filled
        if (!promotionName || !discountPercentage || !promoCode || !startDate || !endDate) {
            alert('Please fill out all fields.');
            return;
        }

        // Validate start date to ensure it is today or in the future
        const selectedStartDate = new Date(startDate);
        const currentDate = new Date(); // Current date for comparison
        currentDate.setHours(0, 0, 0, 0); // Set time to midnight for an accurate comparison

        if (selectedStartDate < currentDate) {
            alert('Start date must be today or a future date.');
            return;
        }

        const promotionData = {
            promotionName,
            discountPercentage,
            promoCode,
            startDate,
            endDate
        };

        try {
            // Submit the promotion data to the backend using Axios
            const response = await axios.post('http://localhost:4000/api/promotions', promotionData);
            console.log(response.data);
            if (response.status === 201) {
                alert('Promotion created successfully!');
                generatePDF(); // Call the function to generate PDF
                // Reset form fields
                setPromotionName('');
                setDiscountPercentage('');
                setPromoCode('');
                setStartDate('');
                setEndDate('');
            } else {
                alert('Failed to create promotion. Please try again.');
            }
        } catch (error) {
            console.error('Error creating promotion:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Function to generate PDF using jsPDF
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Promotion Details', 10, 10);

        doc.setFontSize(12);
        doc.text(`Promotion Name: ${promotionName}`, 10, 30);
        doc.text(`Discount Percentage: ${discountPercentage}%`, 10, 40);
        doc.text(`Promo Code: ${promoCode}`, 10, 50);
        doc.text(`Start Date: ${startDate}`, 10, 60);
        doc.text(`End Date: ${endDate}`, 10, 70);

        // Save the generated PDF
        doc.save(`${promotionName}_promotion.pdf`);
    };

    return (
        <div className="manage-promotions">
            <h2>Manage Promotions</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Promotion Name</label>
                    <input
                        value={promotionName}
                        type="text"
                        onChange={(e) => setPromotionName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Discount Percentage</label>
                    <input
                        type="number"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Promo Code</label>
                    <input
                        type="text"
                        value={promoCode}
                        readOnly
                    />
                    <button type="button" onClick={generatePromoCode}>
                        Generate Promo Code
                    </button>
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        min={today} // Restrict input to today or future dates
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Promotion</button>
            </form>
        </div>
    );
};

export default ManagePromotions;
