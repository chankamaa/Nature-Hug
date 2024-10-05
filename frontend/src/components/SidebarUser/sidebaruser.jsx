/* eslint-disable no-unused-vars */
// SidebarUser.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import './sidebaruser.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-header">Menu</h2>
            <ul className="sidebar-menu">
                <li><NavLink to="/dashboard" className="sidebar-link">Dashboard</NavLink></li>
                <li><NavLink to="/orders" className="sidebar-link">Orders</NavLink></li>
                <li><NavLink to="/coupons" className="sidebar-link">Coupons</NavLink></li>
                <li><NavLink to="/addresses" className="sidebar-link">Addresses</NavLink></li>
                <li><NavLink to="/account-details" className="sidebar-link">Account details</NavLink></li>
                <li><button className="logout-btn" onClick={() => console.log('Logging out...')}>Log Out</button></li>
            </ul>
        </div>
    );
};

export default Sidebar;
