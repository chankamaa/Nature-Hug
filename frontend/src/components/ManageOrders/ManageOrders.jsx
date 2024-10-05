import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageOrder.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/carts');
      setOrders(response.data.carts);
      setFilteredOrders(response.data.carts);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle the change in status and save it to the backend
  const handleStatusChange = async (orderId) => {
    try {
      // Send PATCH request to update cart status
      const response = await axios.patch('http://localhost:4000/api/carts/status', {
        userId: orderId,
        status: newStatus,
      });

      console.log('Cart status updated:', response.data);
      
      // Update local state with the new status
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status: newStatus } : order)));
      setFilteredOrders(filteredOrders.map(order => (order._id === orderId ? { ...order, status: newStatus } : order)));
      
      setEditingOrderId(null); // Exit edit mode after updating
    } catch (error) {
      console.error('Error updating cart status:', error);
    }
  };

  // Handle Edit click
  const handleEditOrder = (orderId, currentStatus) => {
    setEditingOrderId(orderId); // Set the orderId being edited
    setNewStatus(currentStatus); // Set the current status as the default
  };

  // Handle Delete click
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/api/carts/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Filter and search logic
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
    let filtered = [...orders];
    if (filterValue !== 'All') {
      filtered = filtered.filter(order => order.status === filterValue);
    }
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    let filtered = [...orders];
    if (filter !== 'All') {
      filtered = filtered.filter(order => order.status === filter);
    }
    if (value) {
      filtered = filtered.filter(order =>
        order.orderNumber?.toLowerCase().includes(value.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
  };

  return (
    <div className="manage-orders-container">
        <br></br><br></br>
      <h1>Order Tracking Management Dashboard</h1>
<br></br>
      <div className="summary-cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="card">
          <h3>In Progress</h3>
          <p>{orders.filter(order => order.status === 'In Progress').length}</p>
        </div>
        <div className="card">
          <h3>Delivered</h3>
          <p>{orders.filter(order => order.status === 'Delivered').length}</p>
        </div>
        <div className="card">
          <h3>Cancelled</h3>
          <p>{orders.filter(order => order.status === 'Cancelled').length}</p>
        </div>
      </div>

      <div className="filter-container">
        <button onClick={() => handleFilterChange('All')} className={`filter-button ${filter === 'All' ? 'active' : ''}`}>All</button>
        <button onClick={() => handleFilterChange('In Progress')} className={`filter-button ${filter === 'In Progress' ? 'active' : ''}`}>In Progress</button>
        <button onClick={() => handleFilterChange('Delivered')} className={`filter-button ${filter === 'Delivered' ? 'active' : ''}`}>Delivered</button>
        <button onClick={() => handleFilterChange('Cancelled')} className={`filter-button ${filter === 'Cancelled' ? 'active' : ''}`}>Cancelled</button>
        <input
          type="text"
          placeholder="Search by Order Number"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderNumber}</td>
              <td>
                {editingOrderId === order._id ? (
                  <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={`status-label ${order.status?.toLowerCase()}`}>{order.status}</span>
                )}
              </td>
              <td>
                {editingOrderId === order._id ? (
                  <button className="action-button" onClick={() => handleStatusChange(order._id)}>Save</button>
                ) : (
                  <button className="action-button" onClick={() => handleEditOrder(order._id, order.status)}>Edit</button>
                )}
                <button className="action-button delete" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
