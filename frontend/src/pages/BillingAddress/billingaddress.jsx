/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './billingaddress.css'; // Import the CSS file for styling

const BillingAddress = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: '',
        streetAddress1: '',
        streetAddress2: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data
        console.log(formData);
    };

    return (
        <div className="billing-address-container">
            <h2>Billing Address</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Country / Region</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select your country</option>
                        <option value="Country1">Country 1</option>
                        <option value="Country2">Country 2</option>
                        <option value="Country3">Country 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Street Address 1</label>
                    <input
                        type="text"
                        name="streetAddress1"
                        value={formData.streetAddress1}
                        onChange={handleChange}
                        placeholder="House number and street name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Street Address 2</label>
                    <input
                        type="text"
                        name="streetAddress2"
                        value={formData.streetAddress2}
                        onChange={handleChange}
                        placeholder="Apartment, suite, unit, etc. (optional)"
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default BillingAddress;
