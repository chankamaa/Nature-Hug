/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

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

  // Prevent non-letter characters from being typed (e.g., numbers or special characters)
  const handleKeyDown = (event) => {
    const allowedKeys = /^[a-zA-Z]*$/;
    if (!allowedKeys.test(event.key) && event.key !== 'Backspace' && event.key !== ' ') {
      event.preventDefault(); // Block the key press
    }
  };

  const validateAndSetFirstName = (value) => {
    if (value.trim() === '') {
      setFirstNameError('First name is required.');
    } else if (!/^[a-zA-Z ]*$/.test(value)) {
      setFirstNameError('First name can only contain letters.');
    } else {
      setFirstNameError('');
    }
    setFirstName(value);
  };

  const validateAndSetLastName = (value) => {
    if (value.trim() === '') {
      setLastNameError('Last name is required.');
    } else if (!/^[a-zA-Z ]*$/.test(value)) {
      setLastNameError('Last name can only contain letters.');
    } else {
      setLastNameError('');
    }
    setLastName(value);
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    setEmail(value);
  };

  // Updated phone number validation
  const validatePhoneNumber = (value) => {
    // Remove any non-numeric characters
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length > 10) {
      setPhoneNumberError('Phone number must be exactly 10 digits long.');
    } else if (cleanedValue.length < 10) {
      setPhoneNumberError('Phone number must be exactly 10 digits long.');
    } else {
      setPhoneNumberError('');
    }
    setPhoneNumber(cleanedValue);
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    validatePhoneNumber(value);
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
    setPassword(value);
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(value);
  };

  // Function to handle sending user data and OTP request
  const sendData = async (e) => {
    e.preventDefault();

    // Perform validation before submission
    validateAndSetFirstName(firstName);
    validateAndSetLastName(lastName);
    validateEmail(email);
    validatePhoneNumber(phoneNumber);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    // Check if any errors are present
    if (firstNameError || lastNameError || emailError || phoneNumberError || passwordError || confirmPasswordError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation failed!',
        text: 'Please check all fields and try again.',
      });
      return;
    }

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
      console.log('Data Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data || 'Something went wrong!',
      });
    }
  };

  // Function to verify OTP and complete registration
  const verifyOtp = async (e) => {
    e.preventDefault();

    const otpVerificationData = {
      email,
      otp
    };

    try {
      await axios.post("http://localhost:4000/NatureHug/user/signup-verify", otpVerificationData);
      Swal.fire({
        icon: 'success',
        title: 'Registration successful!',
        text: 'You can now log in.',
        showConfirmButton: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'OTP verification failed!',
        text: error.response?.data || 'Invalid OTP or something went wrong.',
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
                value={firstName} 
                onChange={(e) => validateAndSetFirstName(e.target.value)} 
                onKeyDown={handleKeyDown} // Prevent non-letter keys
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
                value={lastName} 
                onChange={(e) => validateAndSetLastName(e.target.value)} 
                onKeyDown={handleKeyDown} // Prevent non-letter keys
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
                value={email}
                onChange={(e) => validateEmail(e.target.value)} 
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
                value={phoneNumber}
                onChange={handlePhoneNumberChange} // Validate phone number
                maxLength="10" // Restrict input to 10 digits
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
                value={password}
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
                value={confirmPassword}
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
                value={otp}
                onChange={(e) => setOtp(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="verify-otp-button">Verify OTP</button>
          </form>
        )}

        <div className="alternative-signup">
          <span>Already have an account? <Link to={"/Login"}>Login here</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
