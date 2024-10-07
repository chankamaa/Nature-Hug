/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // You will create the CSS for the sidebar

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/add/promotions">Manage Promotions</Link></li>
        <li><Link to="/manage-orders/order">Manage Orders</Link></li>
        <li><Link to="/admin/customers">Manage Customers</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/add-product">Add Plants</Link></li>
        <li><Link to="/admin/product-item">Product Item</Link></li>
        <li><Link to="/UserTable">Users</Link></li>
        <li><Link to="/InventoryDashboard">Inventory</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
