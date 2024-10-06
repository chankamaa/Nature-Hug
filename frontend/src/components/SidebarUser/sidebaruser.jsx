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
            <li><NavLink to="/profileView" className="sidebar-link">Account details</NavLink></li>
                <li><NavLink to="/orders" className="sidebar-link">Orders</NavLink></li>
                <li><NavLink to="/coupons" className="sidebar-link">Coupons</NavLink></li>
                <li><NavLink to="/address" className="sidebar-link">Addresses</NavLink></li>
             
                
            </ul>
        </div>
    );
};

export default Sidebar;
