import React, { useState } from 'react';
import axios from 'axios';
import './CashOnDeliveryForm.css';  // Importing CSS for styling

const CashOnDeliveryForm = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // For loading state
    const [errorMessage, setErrorMessage] = useState('');  // To display any error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);  // Set loading state to true while processing

        try {
            const response = await axios.post('http://localhost:4000/api/payment/cod', { amount: 1000 }); // Example amount
            setSuccessMessage(`Order placed successfully with Cash on Delivery. Order ID: ${response.data.orderId}`);
            
            // Redirect to Step04 after a successful COD order
            setTimeout(() => {
                window.location.href = 'http://localhost:5173/Step04';
            }, 2000);  // Adjust delay if needed
        } catch (error) {
            setErrorMessage('Error placing COD order. Please try again.');
            console.error('Error placing COD order:', error);
        } finally {
            setIsLoading(false);  // Stop loading once request is done
        }
    };

    return (
        <form onSubmit={handleSubmit} className="cod-form">
            <h3>Cash On Delivery</h3>
            <p>Amount: LKR 1000</p>  {/* Displaying the fixed amount */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Confirm COD Order'}
            </button>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
    );
};

export default CashOnDeliveryForm;
