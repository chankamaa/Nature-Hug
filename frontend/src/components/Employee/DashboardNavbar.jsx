import React from 'react';
import './DashboardNavbar.css'; 
import { assets } from '../../assets/assets';

const DashboardNavbar = () => {
  return (
    <div className="dashboard-navbar-custom">
     
      <div className="navbar-left-custom">
        <img src={assets.logo} alt="Logo" className="navbar-logo-custom" />
        <button className="menu-icon-custom">
          <i className="fas fa-bars"></i> 
        </button>
      </div>

      <div className="navbar-search-custom">
        <input type="text" placeholder="Search here..." className="simple-search-input-custom" />
        <button className="search-btn-custom">
          <img src={assets.search_icon} alt="Search Icon" className="search-icon-custom" />
        </button>
      </div>

      <div className="navbar-right-custom">
        <div className="navbar-notifications-custom">
          <img src={assets.bell_icon} alt="" className='not-bell-icon' />
          <i className="fas fa-bell"></i> 
          <span className="notification-dot-custom"></span>
        </div>
        <div className="navbar-profile-custom">
          <img src={assets.profile_icon} alt="Profile" className="profile-pic-custom" />
          <span>Welcome Chankama</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
