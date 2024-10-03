import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './EmployeeList.css';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const { url, fetchEmployees, employees } = useContext(StoreContext);
  const navigate = useNavigate();

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${url}/api/employees/${id}`);
        // alert('Employee deleted successfully');
        toast.success('Employee deleted successfully'); // Use toast instead of alert
        fetchEmployees(); // Refresh the employee list after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Department</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>APIT</th> {/* New Column */}
            <th>EPF</th>
            <th>Total Deductions</th> {/* New Column */}
            <th>Total Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.basicSalary}</td>
              <td>{employee.allowances}</td>
              <td>{employee.apit?.toFixed(2) || '0.00'}</td>
              <td>{employee.epfEmployee?.toFixed(2) || '0.00'}</td>
              <td>{employee.totalDeductions?.toFixed(2) || '0.00'}</td>
              <td>{employee.totalSalary?.toFixed(2) || '0.00'}</td>
              <td>
                <button onClick={() => navigate(`/employees/edit/${employee._id}`)}>Edit</button>
                <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
