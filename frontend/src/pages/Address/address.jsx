/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SidebarUser from "../../components/SidebarUser/sidebaruser"; // Corrected import path
import './address.css'; // Ensure the CSS file is imported

const Address = () => {
    return (
        <div className="address-container">
            <SidebarUser /> {/* Include the SidebarUser component */}
            <h2>The following addresses will be used on the checkout page by default.</h2>
            <div className="address-section">
                <div className="address">
                    <h3>
                        <Link to="/billingaddress" className="address-link">Billing address</Link> 
                        <span className="edit-icon">✏️</span>
                    </h3>
                    <p>You have not set up this type of address yet.</p>
                </div>
                <div className="address">
                    <h3>
                        <Link to="/ShippingAddress" className="address-link">Shipping address</Link> 
                        <span className="edit-icon">✏️</span>
                    </h3>
                    <p>You have not set up this type of address yet.</p>
                </div>
            </div>
        </div>
    );
};

export default Address;
