/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role] = useState('User'); 
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Validation states
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFirstName = (value) => {
    const namePattern = /^[A-Za-z]+$/;
    if (value.trim() === '') {
        setFirstNameError('First name is required.');
    } else if (!namePattern.test(value)) {
        setFirstNameError('First name can only contain letters.');
    } else {
        setFirstNameError('');
    }
};

const validateLastName = (value) => {
    const namePattern = /^[A-Za-z]+$/;
    if (value.trim() === '') {
        setLastNameError('Last name is required.');
    } else if (!namePattern.test(value)) {
        setLastNameError('Last name can only contain letters.');
    } else {
        setLastNameError('');
    }
};


  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePhoneNumber = (value) => {
    const phonePattern = /^[0-9]{10}$/; // Assuming phone numbers are 10 digits long
    if (!phonePattern.test(value)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneNumberError('');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password, 
      role 
    };

    try {
      await axios.post("http://localhost:4000/NatureHug/user/signup-request", newUser);
      Swal.fire({
        icon: 'success',
        title: 'OTP sent successfully. Please verify OTP to complete registration.',
        showConfirmButton: true
      });
      setShowOtpInput(true);
    } catch (error) {
      console.log('data Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data || 'Something went wrong!',
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-up-form">
        <h2>Welcome to Nature Hug! Please Sign Up.</h2>
        <h3>Create your Account</h3>
        <form onSubmit={sendData}>
          <div className="name-group">
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                placeholder="Enter your first name" 
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateFirstName(e.target.value);
                }} 
                required 
              />
              {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                placeholder="Enter your last name" 
                onChange={(e) => {
                  setLastName(e.target.value);
                  validateLastName(e.target.value);
                }} 
                required 
              />
              {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }} 
                required 
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                placeholder="Enter your phone number" 
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  validatePhoneNumber(e.target.value);
                }} 
                required 
              />
              {phoneNumberError && <div className="invalid-feedback">{phoneNumberError}</div>}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }} 
                required 
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Confirm your password" 
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }} 
                required 
              />
              {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
            </div>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        {showOtpInput && (
          <form onSubmit={verifyOtp}>
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input 
                type="text" 
                id="otp" 
                name="otp" 
                placeholder="Enter the OTP sent to your email" 
                onChange={(e) => setOtp(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="verify-otp-button">Verify OTP</button>
          </form>
        )}

        <div className="alternative-signup">
        <span>New member? <Link to={"/Login"}>Login here</Link></span>
        </div>
      
      </div>
    </div>
  );
};

export default Signup;