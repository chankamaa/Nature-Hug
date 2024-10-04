import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets';
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

const navbar = () => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/ContactUs");
  };
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
          <div className="navbar-link" onClick={handleNavigation}>
          Contact
        </div>

        <DropdownButton
          id="dropdown-basic-button"
          title="More"
          variant="link"
          className="navbar-link"
        >
          <Dropdown.Item href="/Quiz">Rewards</Dropdown.Item>
          <Dropdown.Item href="/View-Feedbacks">Feedbacks</Dropdown.Item>
          <Dropdown.Item href="/Complains">Complaints</Dropdown.Item>
        </DropdownButton>
        </div>
        <div className="navbar-icons">
          <img className="cart-icon navi" src={assets.cart_icon} alt="icon1" />
          <img className="profile-icon navi" src={assets.profile_icon} alt="profile" />
        </div>
      </div>
    );
};

export default navbar