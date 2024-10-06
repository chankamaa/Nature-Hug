import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './ManagePromotions.css';

const ManagePromotions = () => {
    const [promotionName, setPromotionName] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

    return (
        <div className="manage-promotions">
            <h2>Manage Promotions</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Promotion Name</label>
                    <input 
                        type="text" 
                        value={promotionName} 
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

            {/* Display existing promotions here in the future */}
        </div>
    );
};

export default ManagePromotions;
