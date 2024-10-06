import React, { useState } from 'react';
import axios from 'axios';
import './CardPaymentForm.css';

const CardPaymentForm = () => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: '',
        amount: 1000,  // Example amount
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateCard = () => {
        const tempErrors = {};
        const cardNumberRegex = /^[0-9]{16}$/;
        const cvvRegex = /^[0-9]{3}$/;

        if (!cardNumberRegex.test(cardDetails.cardNumber)) {
            tempErrors.cardNumber = 'Card number must be 16 digits';
        }

        if (!cvvRegex.test(cardDetails.cvv)) {
            tempErrors.cvv = 'CVV must be 3 digits';
        }

        if (!cardDetails.expiryDate) {
            tempErrors.expiryDate = 'Expiry date is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateCard()) {
            try {
                const response = await axios.post('http://localhost:4000/api/payment/card', cardDetails);
                setSuccessMessage(`Payment successful. Order ID: ${response.data.orderId}`);
                
                // Redirect to Step04 after a successful payment
                setTimeout(() => {
                    window.location.href = 'http://localhost:5173/Step04';
                }, 2000);  // Delay for 2 seconds to show the success message
            } catch (error) {
                setErrors({ ...errors, apiError: error.response?.data?.message || 'Payment failed' });
            }
        }
    };

    return (
        <form className='card-form-d' onSubmit={handleSubmit}>
            <h3>Card Payment</h3>
            <div>
                <label>Card Holder</label>
                <input
                    type="text"
                    value={cardDetails.cardHolder}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Card Number</label>
                <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    required
                />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </div>
            <div>
                <label>Expiry Date</label>
                <input
                    type="month"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    required
                />
                {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
            </div>
            <div>
                <label>CVV</label>
                <input
                    type="password"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    required
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
            </div>
            <button type="submit">Pay</button>
            {errors.apiError && <span className="error-message">{errors.apiError}</span>}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
    );
};

export default CardPaymentForm;
