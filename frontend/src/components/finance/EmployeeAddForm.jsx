import React, { useState, useContext } from 'react';
import './EmployeeAddForm.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';  // Import the context

const EmployeeAddForm = () => {
  const { url } = useContext(StoreContext);  // Access the backend URL from context

  const [employee, setEmployee] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    department: '',
    basicSalary: '',
    joiningDate: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  const validateFullName = (name) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({ ...employee, [name]: value });

    switch (name) {
      case 'fullName':
        if (!validateFullName(value)) {
          setErrors({ ...errors, fullName: 'Name can only contain letters and spaces.' });
        } else {
          setErrors({ ...errors, fullName: '' });
        }
        break;

      case 'email':
        if (!validateEmail(value)) {
          setErrors({ ...errors, email: 'Invalid email format.' });
        } else {
          setErrors({ ...errors, email: '' });
        }
        break;

      case 'phoneNumber':
        if (!validatePhoneNumber(value)) {
          setErrors({ ...errors, phoneNumber: 'Phone number must be exactly 10 digits.' });
        } else {
          setErrors({ ...errors, phoneNumber: '' });
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.fullName || errors.email || errors.phoneNumber) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      // Use axios to make the POST request to the backend API
      const response = await axios.post(`${url}/api/employees`, employee, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        alert('Employee added successfully!');
        setEmployee({
          fullName: '',
          email: '',
          phoneNumber: '',
          position: '',
          department: '',
          basicSalary: '',
          joiningDate: ''
        });
      } else {
        alert('Failed to add employee.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="component">
    <form id="employee-add-form" className="employee-add-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Employee</h2>

      <label htmlFor="fullName" className="form-label">
        Full Name:
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-input"
          value={employee.fullName}
          onChange={handleChange}
          required
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
      </label>

      <label htmlFor="email" className="form-label">
        Email:
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={employee.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label htmlFor="phoneNumber" className="form-label">
        Phone Number:
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="form-input"
          value={employee.phoneNumber}
          onChange={handleChange}
          required
        />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </label>

      <label htmlFor="position" className="form-label">
        Position:
        <input
          type="text"
          id="position"
          name="position"
          className="form-input"
          value={employee.position}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="department" className="form-label">
        Department:
        <select
          id="department"
          name="department"
          className="form-input"
          value={employee.department}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Department</option>
          <option value="Human Resources">Human Resources Department</option>
          <option value="Marketing and Sales">Marketing and Sales Department</option>
          <option value="Finance">Finance Department</option>
          <option value="Production/Operations">Production/Operations Department</option>
          <option value="Research and Development">Research and Development Department</option>
          <option value="Customer Service">Customer Service Department</option>
        </select>
      </label>


      <label htmlFor="basicSalary" className="form-label">
        Basic Salary:
        <input
          type="number"
          id="basicSalary"
          name="basicSalary"
          className="form-input"
          value={employee.basicSalary}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="joiningDate" className="form-label">
        Joining Date:
        <input
          type="date"
          id="joiningDate"
          name="joiningDate"
          className="form-input"
          value={employee.joiningDate}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" id="submit-btn" className="submit-btnn">Add Employee</button>
    </form>
    </div>
  );
};

export default EmployeeAddForm;
