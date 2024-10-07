/* eslint-disable no-unused-vars */
import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets';

import { useNavigate } from 'react-router-dom';

const navbar = () => {

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const goToProducts = () => {
    navigate('/product');
  }
  const goToCart = () => {
    navigate('/cart');
  }
  const Aboutus = () => {
    navigate('/Aboutus');
  }
  const login = () => {
    navigate('/login');
  }
  

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        NATURE HUG
      </div>
      <div className="navbar-links">
        <div onClick={goHome} className="navbar-link underline">Home</div>
        <div onClick={goToProducts} className="navbar-link underline">Products</div>
        <div onClick={Aboutus} className="navbar-link underline">About</div>
        <div onClick={login} className="navbar-link underline">Services</div>
        <div className="navbar-link underline">Blog</div>
        <div className="navbar-link underline">Contact</div>
      </div>
      <div className="navbar-icons">
        <img onClick={goToCart} className="cart-icon navi" src={assets.cart_icon} alt="icon1" />


        <img className="profile-icon navi" src={assets.profile_icon} alt="profile" />

      </div>
    </div>
  );
};

export default navbar;
