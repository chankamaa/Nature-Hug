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

      {/* Center: Simple Search bar */}
      <div className="navbar-search-custom">
        <input type="text" placeholder="Search here..." className="simple-search-input-custom" />
        <button className="search-btn-custom">
          <img src={assets.search_icon} alt="Search Icon" className="search-icon-custom" />
        </button>
      </div>

      {/* Right side: Notifications and user profile */}
      <div className="navbar-right-custom">
        <div className="navbar-notifications-custom">
          <i className="fas fa-bell"></i> {/* FontAwesome bell icon */}
          <span className="notification-dot-custom"></span>
        </div>
        <div className="navbar-profile-custom">
          <img src="/path-to-profile-pic.jpg" alt="Profile" className="profile-pic-custom" />
          <span>Welcome Smith</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
