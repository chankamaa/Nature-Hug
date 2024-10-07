/* eslint-disable no-unused-vars */
// BillingAddress.jsx
import React, { useState } from 'react';
import './billingAddress.css'; // Ensure to have a corresponding CSS file

const BillingAddress = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [streetAddress1, setStreetAddress1] = useState('');
    const [streetAddress2, setStreetAddress2] = useState('');
    const [townCity, setTownCity] = useState('');

    const countries = [
        { code: "LK", name: "Sri Lanka" },
        { code: "IN", name: "India" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            firstName,
            lastName,
            companyName,
            country,
            streetAddress1,
            streetAddress2,
            townCity,
        });
    };

    return (
        <div className="billing-address-wrapper">
            <h2 className="billing-header">Billing Address</h2>
            <form className="billing-form" onSubmit={handleSubmit}>
                <label className="form-label">First Name</label>
                <input
                    type="text"
                    className="form-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <label className="form-label">Last Name</label>
                <input
                    type="text"
                    className="form-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <label className="form-label">Company Name</label>
                <input
                    type="text"
                    className="form-input"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <label className="form-label">Country / Region</label>
                <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)} required>
                    <option value="" disabled>Select your country</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                </select>

                <label className="form-label">Street Address 1</label>
                <input
                    type="text"
                    className="form-input"
                    value={streetAddress1}
                    onChange={(e) => setStreetAddress1(e.target.value)}
                    required
                />

                <label className="form-label">Street Address 2</label>
                <input
                    type="text"
                    className="form-input"
                    value={streetAddress2}
                    onChange={(e) => setStreetAddress2(e.target.value)}
                />

                <label className="form-label">Town / City</label>
                <input
                    type="text"
                    className="form-input"
                    value={townCity}
                    onChange={(e) => setTownCity(e.target.value)}
                    required
                />

                <button type="submit" className="submit-button">Save Address</button>
            </form>
        </div>
    );
};

export default BillingAddress;
