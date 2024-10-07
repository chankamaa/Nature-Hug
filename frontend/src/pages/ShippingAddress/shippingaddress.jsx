/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './shippingaddress.css'; // Ensure you have a CSS file for styling

const ShippingAddress = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [streetAddress1, setStreetAddress1] = useState('');
    const [streetAddress2, setStreetAddress2] = useState('');
    const [townCity, setTownCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const countries = [
        { code: "US", name: "United States" },
        { code: "AF", name: "Afghanistan" },
        { code: "AL", name: "Albania" },
        // Add more countries as needed
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({
            firstName,
            lastName,
            companyName,
            country,
            streetAddress1,
            streetAddress2,
            townCity,
            state,
            zipCode,
            phone,
            email,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Shipping Address</h2>

            <label>First Name</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Please fill out this field"
            />

            <label>Last Name</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Please fill out this field"
            />

            <label>Company Name</label>
            <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <label>Country / Region</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                <option value="" disabled>Select your country</option>
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                ))}
            </select>

            <label>Street Address 1</label>
            <input
                type="text"
                value={streetAddress1}
                onChange={(e) => setStreetAddress1(e.target.value)}
                required
                placeholder="House number and street name"
            />

            <label>Street Address 2</label>
            <input
                type="text"
                value={streetAddress2}
                onChange={(e) => setStreetAddress2(e.target.value)}
                placeholder="Apartment, suite, unit, etc. (optional)"
            />

            <label>Town / City</label>
            <input
                type="text"
                value={townCity}
                onChange={(e) => setTownCity(e.target.value)}
                required
                placeholder="Please fill out this field"
            />

            <label>State</label>
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder="Please fill out this field"
            />

            <label>Zip Code</label>
            <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                placeholder="Please fill out this field"
            />

            <label>Phone</label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Please fill out this field"
            />

            <label>Email Address</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Please fill out this field"
            />

            <button type="submit">Save Address</button>
        </form>
    );
};

export default ShippingAddress;
