/* eslint-disable no-unused-vars */
// SidebarUser.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import './sidebaruser.css';

const SidebarUser = () => {
    return (
        <div className="user-sidebar">
            <h2 className="user-sidebar-header">Menu</h2>
            <ul className="user-sidebar-menu">
                <li><NavLink to="/profileView" className="user-sidebar-link">Account Details</NavLink></li>
                <li><NavLink to="/cart" className="user-sidebar-link">Orders</NavLink></li>
                <li><NavLink to="/coupons" className="user-sidebar-link">Coupons</NavLink></li>
                <li><NavLink to="/address" className="user-sidebar-link">Addresses</NavLink></li>
            </ul>
        </div>
    );
};

export default SidebarUser;
