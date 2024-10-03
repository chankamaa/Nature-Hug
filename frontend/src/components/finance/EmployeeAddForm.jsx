import React, { useState, useContext, useEffect } from 'react';
import './EmployeeAddForm.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';  // Import the context
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardNavbar from '../Employee/DashboardNavbar';

const EmployeeAddForm = () => {
  const { url } = useContext(StoreContext);  // Access the backend URL from context

  const [employee, setEmployee] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    department: '',
    basicSalary: '',
    joiningDate: '',
    birthday: '',  // Add birthday to state
    NICNumber: '',  // Add NIC Number
    allowances: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    birthday: ''  // Add birthday to errors
  });

  // Validation functions
  const validateFullName = (name) => /^[a-zA-Z\s]*$/.test(name);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const validateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  // Handle input change and block invalid characters for the full name and phone number fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'fullName') {
      const validName = value.replace(/[^a-zA-Z\s]/g, ''); // Only allow letters and spaces
      setEmployee({ ...employee, [name]: validName });
      setErrors({ ...errors, fullName: validName === value ? '' : 'Name can only contain letters and spaces.' });
    } else if (name === 'phoneNumber') {
      const validPhone = value.replace(/[^0-9]/g, ''); // Only allow numbers for phone number
      setEmployee({ ...employee, [name]: validPhone });
      setErrors({ ...errors, phoneNumber: validatePhoneNumber(validPhone) ? '' : 'Phone number must be exactly 10 digits.' });
    } else if (name === 'NICNumber') {
      const validNIC = value.replace(/[^0-9vV]/g, ''); // Only allow numbers and V/v for NIC
      setEmployee({ ...employee, [name]: validNIC });
    } else {
      setEmployee({ ...employee, [name]: value });
    }

    if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) ? '' : 'Invalid email format.' });
    } else if (name === 'birthday') {
      const age = validateAge(value);
      setErrors({ ...errors, birthday: age >= 18 ? '' : 'Employee must be at least 18 years old.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.fullName || errors.email || errors.phoneNumber || errors.birthday) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await axios.post(`${url}/api/employees`, employee, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        toast.success('Employee added successfully!');
        setEmployee({
          fullName: '',
          email: '',
          phoneNumber: '',
          position: '',
          department: '',
          basicSalary: '',
          allowances: '',
          NICNumber: '',
          birthday: '',
          joiningDate: ''
        });
      } else {
        toast.error('Failed to add employee.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while adding the employee.');
    }
  };

  return (
    <div className="employee-add-nav">
      <DashboardNavbar />
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

          <label htmlFor="birthday" className="form-label">
            Birthday:
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="form-input"
              value={employee.birthday}
              onChange={handleChange}
              required
            />
            {errors.birthday && <span className="error">{errors.birthday}</span>}
          </label>

          <label htmlFor="NICNumber" className="form-label">
            NIC Number:
            <input
              type="text"
              id="NICNumber"
              name="NICNumber"
              className="form-input"
              value={employee.NICNumber}
              onChange={handleChange}
              required
            />
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
            />
          </label>

          <label htmlFor="allowances" className="form-label">
            Allowances:
            <input
              type="number"
              id="allowances"
              name="allowances"
              className="form-input"
              value={employee.allowances}
              onChange={handleChange}
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
    </div>
  );
};

export default EmployeeAddForm;
