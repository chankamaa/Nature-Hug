import React from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Check if the user is logged in by verifying if the token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        NATURE HUG
      </div>
      <div className="navbar-links">
        <div className="navbar-link underline">Home</div>
        <div className="navbar-link underline">Products</div>
        <div className="navbar-link">About</div>
        <div className="navbar-link">Services</div>
        <div className="navbar-link">Blog</div>
        <div className="navbar-link">Contact</div>
        <Link to="/login">   <div className="navbar-link">Login</div> </Link>

      </div>
      <div className="navbar-icons">
        <img className="cart-icon navi" src={assets.cart_icon} alt="icon1" />

        {/* profile icon will be visible when the user is logged in */}
        {!isLoggedIn ? (
          <Link to="/login">
            <button className="btn btn-outline-primary">LogIn</button>
          </Link>
        ) : (
          <img className="profile-icon navi" src={assets.profile_icon} alt="profile" />
          
        )}
      </div>
    </div>
  );
};

export default Navbar;
