// eslint-disable-next-line no-unused-vars
import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const navbar = () => {
    return (
      <div className="navbar-container">
        <div className="navbar-logo">
          NATURE HUG
        </div>
        <div className="navbar-links">
          <div className="navbar-link underline">Home</div>
         <Link to = '/product' ><div className="navbar-link underline">Products</div></Link>
          <Link to = '/Aboutus'><div className="navbar-link">About</div></Link>
          <div className="navbar-link">Services</div>
          <div className="navbar-link">Blog</div>
          <div className="navbar-link">Contact</div>
        </div>
        <div className="navbar-icons">
          <Link to ='/cart'><img className="cart-icon navi" src={assets.cart_icon} alt="icon1" /></Link>
          <img className="profile-icon navi" src={assets.profile_icon} alt="profile" />
        </div>
      </div>
    );
};

export default navbar;