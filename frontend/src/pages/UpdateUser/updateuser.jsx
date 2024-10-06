/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './updateuser.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // For navigation after updating
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/NatureHug/user/view-user/${id}`);
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          password: '', // Leave password fields empty for security
          confirmPassword: '', // Leave password fields empty for security
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission for updating user data
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.put(`http://localhost:4000/NatureHug/user/update-user/${id}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password, // Send password only if it's changed
      });
      alert('User updated successfully!');
      navigate('/'); // Redirect to another page after updating
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-up-form">
        <h3>Update User</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="name-group">
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                placeholder="Enter your first name" 
                value={user.firstName}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                placeholder="Enter your last name" 
                value={user.lastName}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          <div className="contact-group">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email address" 
                value={user.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                placeholder="Enter your phone number" 
                value={user.phoneNumber}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          <div className="password-group">
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password" 
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Confirm your password" 
                value={user.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" className="signup-button">Update</button>
          
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
