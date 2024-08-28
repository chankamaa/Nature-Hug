import React from 'react';
import AddProductForm from '../components/AddProductForm/AddProductForm'; // We'll create this next
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div>
      
      <div className="admin-dashboard-content">
        <h1 className='headline'>Add Plant +</h1>
        <AddProductForm />
      </div>
      
    </div>
  );
};

export default AdminDashboard;
