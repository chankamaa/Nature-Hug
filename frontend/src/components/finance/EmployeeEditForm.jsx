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
    birthday: '',
    NICNumber: '',
    position: '',
    department: '',
    basicSalary: '',
    joiningDate: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    NICNumber: ''
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

  // Validation functions
  const validateFullName = (name) => /^[a-zA-Z\s]*$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);
  const validateNICNumber = (nic) => /^[0-9vV]*$/.test(nic);
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
  // Format the date as yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // en-CA formats the date as yyyy-mm-dd
  };
  

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

      // Real-time NIC validation for 9 digits + v/V or 12 digits
      const isNineDigitNIC = /^[0-9]{9}[vV]$/.test(validNIC); // 9 digits + v/V
      const isTwelveDigitNIC = /^[0-9]{12}$/.test(validNIC);   // 12 digit NIC
      const isValidNIC = isNineDigitNIC || isTwelveDigitNIC;

      setErrors({
        ...errors,
        NICNumber: isValidNIC ? '' : 'NIC number must be 9 digits followed by V/v or 12 digits.',
      });
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

    if (errors.fullName || errors.email || errors.phoneNumber || errors.birthday || errors.NICNumber) {
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

      <label htmlFor="birthday" className="form-label">
        Birthday:
        <input
          type="date"
          id="birthday"
          name="birthday"
          className="form-input"
          value={formatDate(employee.birthday)}
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
        {errors.NICNumber && <span className="error">{errors.NICNumber}</span>}
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
