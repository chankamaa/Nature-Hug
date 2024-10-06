import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';  // Import jsPDF autoTable
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

  // Function to update the order status
  const handleStatusChange = async (orderId) => {
    try {
      const updatedOrder = orders.find(order => order._id === orderId);
      if (updatedOrder) {
        await axios.patch('http://localhost:4000/api/carts/status', {
          userId: updatedOrder.userId,
          status: newStatus,
        });
        const updatedOrders = orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setEditingOrderId(null); // Exit editing mode
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Function to generate the PDF with order data
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a header to the PDF
    const logoImg = '';  // Path to your logo
    const headerText = `Nature Hug\nAddress: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara\nEmail: handamama.pvt@gmail.com | Phone: +94 76 258 2337`;
    const currentDate = new Date().toLocaleDateString();

    doc.setFontSize(12);
    doc.text(headerText, 10, 10);
    doc.text(`Date: ${currentDate}`, 150, 10);

    // Table column headers
    const tableColumn = ["Order Number", "Status"];
    const tableRows = [];

    // Loop through orders and create table rows
    filteredOrders.forEach((order, index) => {
      const orderData = [
        order.orderNumber || `ORD-${index + 1}`,  // Order Number
        order.status                              // Status
      ];
      tableRows.push(orderData);
    });

    // Add table to the PDF
    doc.autoTable({
      startY: 30, // Position after header
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save("order_report.pdf");
  };

  // Handle Edit click - Enable editing mode for the selected order
  const handleEditOrder = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  // Handle Save click (For saving the updated status)
  const handleSave = (orderId) => {
    handleStatusChange(orderId);
  };

  // Handle Delete click (For deleting an order)
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/api/carts/${orderId}`);
      const updatedOrders = orders.filter(order => order._id !== orderId);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
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

    // Apply filter first, if not 'All'
    if (filter !== 'All') {
      filtered = filtered.filter(order => order.status === filter);
    }

    // Apply search term filter
    if (value) {
      filtered = filtered.filter((order, index) => {
        const orderNum = order.orderNumber || `ORD-${index + 1}`;
        return orderNum.toLowerCase().includes(value.toLowerCase());
      });
    }

    setFilteredOrders(filtered);
  };

  return (
    <div className="manage-orders-container">
      <br /><br />
      <h1>Order Tracking Management Dashboard</h1>
      <br />
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

      <button className="action-button" onClick={generatePDF}>Download PDF</button>

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
              <td>{order.orderNumber || `ORD-${index + 1}`}</td>
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
                  <button className="action-button" onClick={() => handleSave(order._id)}>Save</button>
                ) : (
                  <button className="action-button" onClick={() => handleEditOrder(order._id, order.status)}>Edit</button>
                )}
                <button className="action-button delete" onClick={() => handleDeleteOrder(order._id, order.status)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
