import React, { useState } from 'react';
import CardPaymentForm from '../../components/payments/CardPaymentForm';
import BankTransferForm from '../../components/payments/BankTransferForm';
import CashOnDeliveryForm from '../../components/payments/CashOnDeliveryForm';
import './PaymentPage.css';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [error, setError] = useState('');

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
        setError('');  // Clear any existing error message when a method is selected
    };

    const handleSubmit = () => {
        if (!paymentMethod) {
            setError('Please select a payment method before proceeding.');
            return;
        }

        // Handle submission based on selected payment method
        switch (paymentMethod) {
            case 'card':
                // Handle card payment form submission (you may call an API or show a success message here)
                break;
            case 'bank':
                // Handle bank transfer form submission
                break;
            case 'cod':
                // Handle cash on delivery form submission
                break;
            default:
                break;
        }
    };

    const renderPaymentForm = () => {
        switch (paymentMethod) {
            case 'card':
                return <CardPaymentForm />;
            case 'bank':
                return <BankTransferForm />;
            case 'cod':
                return <CashOnDeliveryForm />;
            default:
                return null;
        }
    };

    return (
        <div className="payment-page">
            <h2>Select Payment Method</h2>
            <div className="payment-methods">
                <label>
                    <input 
                        type="radio" 
                        value="card" 
                        checked={paymentMethod === 'card'} 
                        onChange={handlePaymentMethodChange} 
                    />
                    Credit/Debit Card
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="bank" 
                        checked={paymentMethod === 'bank'} 
                        onChange={handlePaymentMethodChange} 
                    />
                    Bank Transfer
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="cod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={handlePaymentMethodChange} 
                    />
                    Cash on Delivery
                </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            {renderPaymentForm()}

            
        </div>
    );
};

export default PaymentPage;
