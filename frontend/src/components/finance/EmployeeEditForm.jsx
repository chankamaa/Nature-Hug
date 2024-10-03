import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './EmployeeEditForm.css';
import { toast } from 'react-toastify';

const EmployeeEditForm = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  const { url } = useContext(StoreContext);
  
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

  useEffect(() => {
    // Fetch the existing employee details when the component loads
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${url}/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployee();
  }, [id, url]);

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
      // alert('Please fix the errors before submitting.');
      toast.error('Please fix the errors before submitting.'); 
      return;
    }

    try {
      const response = await axios.put(`${url}/api/employees/${id}`, employee);

      if (response.status === 200) {
        toast.success('Employee updated successfully');
        navigate('/employees'); 
      } else {
        toast.error('Failed to update employee. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <form id="employee-edit-form" className="employee-edit-form" onSubmit={handleSubmit}>
      <h2>Edit Employee Details</h2>

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

      <button type="submit" id="submit-btn" className="submit-btn">Update Employee</button>
    </form>
  );
};

export default EmployeeEditForm;
