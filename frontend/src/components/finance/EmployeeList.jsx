import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx'; // Import xlsx for Excel generation
import './EmployeeList.css';
import DashboardNavbar from '../Employee/DashboardNavbar';

const EmployeeList = () => {
  const { url, fetchEmployees, employees } = useContext(StoreContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(''); // For filtering employees

  // Function to format currency with commas and two decimal points
  const formatCurrency = (value) => {
    return value ? new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(value) : '0.00';
  };

  // Delete employee function
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${url}/api/employees/${id}`);
        toast.success('Employee deleted successfully');
        fetchEmployees(); // Refresh the employee list after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  // Download employee details as Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees); // Convert JSON to worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees'); // Append worksheet to workbook
    XLSX.writeFile(workbook, 'employee_details.xlsx'); // Export Excel file
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to the employee details page when a row is clicked
  const viewEmployeeDetail = (id) => {
    navigate(`/employees/${id}`); // Navigate to the employee details page
  };

  return (
    <div className="employee-list">
      <DashboardNavbar />
      <div className="employee-list-header">
        <h2>Employee List</h2>
        <div className="search-and-download">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={downloadExcel} className="download-btn">Download Excel</button>
        </div>
      </div>

      <table className='employee-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Department</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>APIT</th>
            <th>EPF</th>
            <th>Total Deductions</th>
            <th>Total Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id} className="clickable-row" onClick={() => viewEmployeeDetail(employee._id)}>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{formatCurrency(employee.basicSalary)}</td> {/* Formatted */}
              <td>{formatCurrency(employee.allowances)}</td> {/* Formatted */}
              <td>{formatCurrency(employee.apit?.toFixed(2) || '0.00')}</td> {/* Formatted */}
              <td>{formatCurrency(employee.epfEmployee?.toFixed(2) || '0.00')}</td> {/* Formatted */}
              <td>{formatCurrency(employee.totalDeductions?.toFixed(2) || '0.00')}</td> {/* Formatted */}
              <td>{formatCurrency(employee.totalSalary?.toFixed(2) || '0.00')}</td> {/* Formatted */}
              <td>
                <button onClick={(e) => { e.stopPropagation(); navigate(`/employees/edit/${employee._id}`); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); deleteEmployee(employee._id); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
