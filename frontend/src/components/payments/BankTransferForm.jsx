import React, { useState } from 'react';
import axios from 'axios';
import './BankTransferForm.css';  // Importing CSS for styling

const BankTransferForm = () => {
    const [slip, setSlip] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (e) => {
        setSlip(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset any previous messages
        setSuccessMessage('');
        setErrorMessage('');
        
        if (!slip) {
            setErrorMessage('Please upload a payment slip.');
            return;
        }

        const formData = new FormData();
        formData.append('paymentSlip', slip);
        formData.append('amount', 1000);  // Example amount

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:4000/api/payment/bank', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccessMessage(`Bank transfer initiated. Order ID: ${response.data.orderId}`);

            // Redirect to Step04 after a successful bank transfer submission
            setTimeout(() => {
                window.location.href = 'http://localhost:5173/Step04';
            }, 2000);  // Adjust delay if needed
        } catch (error) {
            setErrorMessage('Error submitting bank transfer. Please try again.');
            console.error('Error submitting bank transfer:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bank-transfer-form">
            <h3>Bank Transfer</h3>
            <div>
                <label>Upload Payment Slip</label>
                <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} required />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
    );
};

export default BankTransferForm;
