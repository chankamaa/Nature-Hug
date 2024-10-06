/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './billingaddress.css';

const BillingAddress = () => {
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
        "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra",
        "Angola", "Argentina", "Armenia", "Australia", "Austria",
        // Add more countries as needed
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Billing Address</h2>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <label>Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

            <label>Country / Region</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="" disabled>Select your country</option> {/* Placeholder option */}
                {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>

            <label>Street Address 1</label>
            <input type="text" value={streetAddress1} onChange={(e) => setStreetAddress1(e.target.value)} />

            <label>Street Address 2</label>
            <input type="text" value={streetAddress2} onChange={(e) => setStreetAddress2(e.target.value)} />

            <label>Town / City</label>
            <input type="text" value={townCity} onChange={(e) => setTownCity(e.target.value)} />

            <label>State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />

            <label>Zip Code</label>
            <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />

            <label>Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button type="submit">Save Address</button>
        </form>
    );
};

export default BillingAddress;
