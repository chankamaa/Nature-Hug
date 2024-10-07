import React, { useState } from 'react';
import './SupplierOrder.css';

const SupplierOrder = () => {
  // Extended example orders data
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: 'Organic Fertilizer',
      quantity: 100,
      date: 'October 7, 2024',
      status: 'Pending',
    },
    {
      id: 2,
      product: 'Plant Pots',
      quantity: 200,
      date: 'October 6, 2024',
      status: 'Shipped',
    },
    {
      id: 3,
      product: 'Gardening Tools',
      quantity: 50,
      date: 'October 5, 2024',
      status: 'Delivered',
    },
    {
      id: 4,
      product: 'Compost Soil',
      quantity: 75,
      date: 'October 4, 2024',
      status: 'Pending',
    },
    {
      id: 5,
      product: 'Indoor Plants',
      quantity: 120,
      date: 'October 3, 2024',
      status: 'Shipped',
    },
    {
      id: 6,
      product: 'Outdoor Plants',
      quantity: 300,
      date: 'October 2, 2024',
      status: 'Pending',
    },
    {
      id: 7,
      product: 'Pesticides',
      quantity: 40,
      date: 'October 1, 2024',
      status: 'Delivered',
    },
    {
      id: 8,
      product: 'Compost Bins',
      quantity: 30,
      date: 'September 30, 2024',
      status: 'Pending',
    },
    {
      id: 9,
      product: 'Watering Cans',
      quantity: 100,
      date: 'September 29, 2024',
      status: 'Shipped',
    },
    {
      id: 10,
      product: 'Plant Nutrients',
      quantity: 60,
      date: 'September 28, 2024',
      status: 'Delivered',
    },
  ]);

  const initialFormState = { product: '', quantity: '', date: '', status: 'Pending' };

  // Example product data (you can fetch this from an API or backend if needed)
  const [products] = useState([
    'Organic Fertilizer',
    'Plant Pots',
    'Gardening Tools',
    'Compost Soil',
    'Indoor Plants',
    'Outdoor Plants',
    'Pesticides',
    'Compost Bins',
    'Watering Cans',
    'Plant Nutrients',
  ]);

  // State for managing new/edit order form
  const [currentOrder, setCurrentOrder] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  // Handle creating or updating an order
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update the existing order
      setOrders(orders.map((order) =>
        order.id === currentOrder.id ? currentOrder : order
      ));
    } else {
      // Create a new order
      const newOrder = { ...currentOrder, id: orders.length + 1 };
      setOrders([...orders, newOrder]);
    }

    resetForm();
  };

  // Reset form to initial state
  const resetForm = () => {
    setCurrentOrder(initialFormState);
    setIsEditing(false);
  };

  // Handle editing an order
  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setIsEditing(true);
  };

  // Handle deleting an order
  const handleDeleteOrder = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="supplier-order-page">
        <br></br><br></br>
      <h1>Supplier Orders</h1>

      {/* Order List */}
      <div className="order-list">
        <h2>All Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditOrder(order)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create or Edit Order */}
      <div className="create-order">
        <h2>{isEditing ? 'Edit Order' : 'Create New Order'}</h2>
        <form onSubmit={handleSubmitOrder}>
          <label>
            Product:
            <select
              name="product"
              value={currentOrder.product}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select a product</option>
              {products.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={currentOrder.quantity}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={currentOrder.date}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Status:
            <select name="status" value={currentOrder.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </label>
          <button type="submit">{isEditing ? 'Update Order' : 'Create Order'}</button>
          {isEditing && <button onClick={resetForm} className="cancel-btn">Cancel</button>}
        </form>
      </div>
    </div>
  );
};

export default SupplierOrder;
