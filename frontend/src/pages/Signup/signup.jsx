import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role] = useState('User'); // Set role to 'User' by default
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const sendData = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setError(''); // Clear the error if passwords match

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password, 
      role // 'User' is automatically set here
    };

    console.log('Sending data:', newUser); // Log the form data

    // First send the user data to request an OTP
    try {
      await axios.post("http://localhost:4000/NatureHug/user/signup-request", newUser);
      Swal.fire({
        icon: 'success',
        title: 'OTP sent successfully. Please verify OTP to complete registration.',
        showConfirmButton: true
      });
      setShowOtpInput(true); // Show OTP input to verify OTP
    } catch (error) {
      console.log('data Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data || 'Something went wrong!',
      });
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      otp,
      firstName,
      lastName,
      phoneNumber,
      password,
      role // 'User' is automatically set here as well
    };

    try {
      await axios.post("http://localhost:4000/NatureHug/user/signup-verify", userData);
      Swal.fire({
        icon: 'success',
        title: 'User registered successfully.',
        showConfirmButton: true
      }).then(() => {
        window.location.href = '/login';
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data || 'Invalid OTP or something went wrong!',
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
                onChange={(e) => setFirstName(e.target.value)} 
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
                onChange={(e) => setLastName(e.target.value)} 
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
                onChange={(e) => setEmail(e.target.value)} 
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
                onChange={(e) => setPhoneNumber(e.target.value)} 
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
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Confirm your password" 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
          </div>
          <div className="terms">
            <p>
              By selecting Create personal account, you agree to our <a href="#">User Agreement</a> and acknowledge reading our <a href="#">User Privacy Notice</a>.
            </p>
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
          <span>Already a member? <a href="#">Login here</a></span>
        </div>
        <button className="google-signup-button">G+ Google</button>
      </div>
    </div>
  );
};

export default Signup;
