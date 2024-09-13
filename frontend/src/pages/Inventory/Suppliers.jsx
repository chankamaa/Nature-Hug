/* eslint-disable no-unused-vars */
import React from 'react'
import Dashboard from '../../components/Dash/Dashboard'
import './Instocks.css'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Suppliers = () =>  {
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
      const response = await axios.get('http://localhost:4000/api/suppliers/data');
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
      await axios.put(`http://localhost:4000/api/suppliers/${id}`, newSupplier);
      fetchSuppliers();
      setEditSupplierId(null);
    } catch (error) {
      console.error('Error updating supplier', error);
    }
  };

  // Delete a supplier
  const deleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/suppliers/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier', error);
    }
  };
  
  return (
    <div className="dashbard-container">   
      <Dashboard/>
      <main className="main-contet">
      <section>

    <form onSubmit={editSupplierId ? () => updateSupplier(editSupplierId) : addSupplier}>      
      <div className='type1'>
          <label>Supplier ID:</label>
          <input type="text"name="ID" placeholder='Supplier ID' value={newSupplier.ID} onChange={handleChange} required/>
          <label>Supplier Name:</label>
          <input type="text"name="Suppliername" placeholder='Supplier Name' value={newSupplier.Suppliername} onChange={handleChange} required/>
          <label>Description:</label>
          <input type="text"name="Description" placeholder='Description' value={newSupplier.Description} onChange={handleChange} required/>
          <label >Contact Infor:</label>
          <input type="text"name="Contactinfor" placeholder='Contact Info' value={newSupplier.Contactinfor} onChange={handleChange} required/>
          <label >Product:</label>
          <input type="text"name="Product" placeholder='Product' value={newSupplier.Product} onChange={handleChange}required/>

          <button className='button1'>{editSupplierId ? 'Update Supplier' : 'Add Supplier'} ADD</button>
          <button className='button2'> Remove</button>
          
  
          </div>
          </form>
          </section>

      <div style={{ padding: '20px', backgroundColor: '#f5f5dc' }}>   {/* Display the list of suppliers in a table */}
      <h2>Supplier List</h2>
      {suppliers.length === 0 ? (
        <p>No suppliers available.</p>
      ) : (
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Description</th>
              <th>Contact Info</th>
              <th>Product</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.ID}>
                <td>{supplier.ID}</td>
                <td>{supplier.Suppliername}</td>
                <td>{supplier.Description}</td>
                <td>{supplier.Contactinfor}</td>
                <td>{supplier.Product}</td>
                <td>
                  <button onClick={() => {
                    setEditSupplierId(supplier.ID);
                    setNewSupplier(supplier);
                  }}>Edit</button>
                  <button onClick={() => deleteSupplier(supplier.ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     
      )}  
       </div>
       </main>
     </div>
  )
}
export default Suppliers