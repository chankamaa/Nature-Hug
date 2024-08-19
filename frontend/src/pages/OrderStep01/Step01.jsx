import React, { useState } from 'react';
import './Step01.css';

const Step01 = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Email submitted:', email);
    };

    return (
        <div className="email-input-container">
            <h2>Continue Shopping</h2>
            <h3>Email Address</h3>
            <p className="step-indicator">Step 1/4</p>
            <div className="returning-customer-box">
                <p>Returning Customer?</p>
                <a href="/signin">Sign into your account to keep your orders in one place.</a>
            </div>
            <form onSubmit={handleSubmit} className="email-form">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email Address"
                    required
                />
                <p className="privacy-policy">
                    By providing your email address, you agree to our <a href="/privacy-policy">privacy policy</a> and <a href="/terms">Terms and Conditions</a>.
                </p>
                <button type="submit" className="continue-button">Continue</button>
            </form>
        </div>
    );
};

export default Step01;
