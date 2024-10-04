import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // You will create the CSS for the sidebar


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/promotions">Manage Promotions</Link></li>
        <li><Link to="/admin/orders">Manage Orders</Link></li>
        <li><Link to="/admin/customers">Manage Customers</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/add/product">Add to Plant</Link></li>
        <li><Link to="/admin/add/ProductItem">Update/Delete</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
