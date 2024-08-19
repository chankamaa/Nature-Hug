import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './SalaryDashboard.css';

const SalaryDashboard = () => {
  const { url } = useContext(StoreContext);  // Get the backend URL from context
  const [employees, setEmployees] = useState([]);  // State to store employee salary data

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(`${url}/api/employees/salaries`);
        setEmployees(response.data);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    };

    fetchSalaries();  // Fetch salary data on component mount
  }, [url]);

  return (
    <div className="salary-dashboard">
      <h2>Salary Dashboard</h2>
      <table className="salary-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Total Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.fullName}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.basicSalary}</td>
              <td>{employee.allowances}</td>
              <td>{employee.totalSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryDashboard;
