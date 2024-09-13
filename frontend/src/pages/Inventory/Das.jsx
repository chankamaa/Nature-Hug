/* eslint-disable no-unused-vars */
import React from 'react'
import Dashboard from '../../components/Dash/Dashboard'
import  { useState, useEffect } from 'react';
import axios from 'axios';


 

function App() {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
      ID: '',
      Suppliername: '',
      Description: '',
      Contactinfor: '',
      Product: '',
    });
    const [editSupplierId, setEditSupplierId] = useState(null);
  
    // Fetch all suppliers
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/suppliers');
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };
  
    useEffect(() => {
      fetchSuppliers();
    }, []);
  
    // Handle form change for adding new supplier
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewSupplier({ ...newSupplier, [name]: value });
    };
  
    // Add a new supplier
    const addSupplier = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:4000/api/suppliers', newSupplier);
        fetchSuppliers();
        setNewSupplier({ ID: '', Suppliername: '', Description: '', Contactinfor: '', Product: '' });
      } catch (error) {
        console.error('Error adding supplier', error);
      }
    };
  
    // Update a supplier
    const updateSupplier = async (id) => {
      try {
        await axios.put(`http://localhost:4000/api/supplier/${id}`, newSupplier);
        fetchSuppliers();
        setEditSupplierId(null);
      } catch (error) {
        console.error('Error updating supplier', error);
      }
    };
  
    // Delete a supplier
    const deleteSupplier = async (id) => {
      try {
        await axios.delete(`http://localhost:4000/api/supplier/${id}`);
        fetchSuppliers();
      } catch (error) {
        console.error('Error deleting supplier', error);
      }
    };
  
    return (
      <div className="App">
        <h1>Supplier Management</h1>
  
        {/* Form to Add or Edit Supplier */}
        <form onSubmit={editSupplierId ? () => updateSupplier(editSupplierId) : addSupplier}>
          <input
            type="text"
            name="ID"
            placeholder="Supplier ID"
            value={newSupplier.ID}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Suppliername"
            placeholder="Supplier Name"
            value={newSupplier.Suppliername}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={newSupplier.Description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="Contactinfor"
            placeholder="Contact Info"
            value={newSupplier.Contactinfor}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Product"
            placeholder="Product"
            value={newSupplier.Product}
            onChange={handleChange}
            required
          />
          <button type="submit">{editSupplierId ? 'Update Supplier' : 'Add Supplier'}</button>
        </form>
  
        {/* Supplier List */}
        <h2>All Suppliers</h2>
        <ul>
          {suppliers.map((supplier) => (
            <li key={supplier.ID}>
              <p>{supplier.Suppliername}</p>
              <p>{supplier.Description}</p>
              <p>{supplier.Contactinfor}</p>
              <p>{supplier.Product}</p>
              <button onClick={() => {
                setEditSupplierId(supplier.ID);
                setNewSupplier(supplier);
              }}>Edit</button>
              <button onClick={() => deleteSupplier(supplier.ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default App