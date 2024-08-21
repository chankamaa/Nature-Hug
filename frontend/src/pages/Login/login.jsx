import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/NatureHug/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Login Successful!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          _id: response.data._id,
        }));
        // Redirect to the desired page after login
        window.location.href = '/user-profile';
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Nature Hug! Please login.</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <small className="text-danger">{emailError}</small>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <small className="text-danger">{passwordError}</small>}
          </div>
          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        
        <div className="alternative-login">
          <span>Or, login with</span>
        </div>
        <button className="google-login-button">G+ Google</button>
        <div className="register">
          <span>New member? <a href="#">Register here</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
