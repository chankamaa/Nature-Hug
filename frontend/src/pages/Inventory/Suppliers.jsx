/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Dashboard from '../../components/Dash/Dashboard';
import './Instocks.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]); // search
  const [newSupplier, setNewSupplier] = useState({
    ID: '',
    Suppliername: '',
    Description: '',
    Contactinfor: '',
    Product: '',
  });
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  //  all suppliers
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/suppliers/data');
      setSuppliers(response.data.suppliers);
      setFilteredSuppliers(response.data.suppliers); // Initialize filtered suppliers
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

  // Search function to filter suppliers by name or any other field
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = suppliers.filter((supplier) =>
      supplier.Suppliername.toLowerCase().includes(searchValue)
    );

    setFilteredSuppliers(filtered);
  };

  // Download suppliers data as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text('Supplier Management Report', 14, 10);

    const tableColumn = ['ID', 'Supplier Name', 'Description', 'Contact Info', 'Product'];
    const tableRows = [];

    filteredSuppliers.forEach((supplier) => {
      const supplierData = [
        supplier.ID,
        supplier.Suppliername,
        supplier.Description,
        supplier.Contactinfor,
        supplier.Product,
      ];
      tableRows.push(supplierData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('suppliers_report.pdf');
  };

  return (
    <div className='mmm'>
      <div className="dashbard-container">
        <Dashboard />
        <main className="main-contet">
          <section>


            <form onSubmit={editSupplierId ? () => updateSupplier(editSupplierId) : addSupplier}>
              <div className="type1">


                <input type="text" placeholder="Search by Supplier Name" value={searchTerm} onChange={handleSearch} className="search-bar" />

                <label>Supplier ID:</label>
                <input type="text" name="ID" placeholder="Supplier ID" value={newSupplier.ID} onChange={handleChange} required />
                <label>Supplier Name:</label>
                <input type="text" name="Suppliername" placeholder="Supplier Name" value={newSupplier.Suppliername} onChange={handleChange} required />
                <label>Description:</label>
                <input type="text" name="Description" placeholder="Description" value={newSupplier.Description} onChange={handleChange} required />
                <label>Contact Infor:</label>
                <input type="text" name="Contactinfor" placeholder="Contact Info" value={newSupplier.Contactinfor} onChange={handleChange} required />
                <label>Product:</label>
                <input type="text" name="Product" placeholder="Product" value={newSupplier.Product} onChange={handleChange} required />

                <button className="button1">
                  {editSupplierId ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </section></main></div>

      <h2 style={{ textAlign: 'center' }}>Supplier List</h2>


      <main className="main-contet">
        <table style={{ width: '100%' }} border="1">
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
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.ID}>
                <td>{supplier.ID}</td>
                <td>{supplier.Suppliername}</td>
                <td>{supplier.Description}</td>
                <td>{supplier.Contactinfor}</td>
                <td>{supplier.Product}</td>
                <td>
                  <button className='ed1' onClick={() => {
                    setEditSupplierId(supplier.ID);
                    setNewSupplier(supplier);
                  }}
                  >
                    Edit
                  </button>
                  <button className='de1' onClick={() => deleteSupplier(supplier.ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <div className='cont'>
        <button className="button1" onClick={downloadPDF}>Download PDF</button>
      </div>

    </div>
  );
};

export default Suppliers;
