import React from 'react';
import './DashboardNavbar.css'; // Import your CSS for styling

const DashboardNavbar = () => {
  return (
    <div className="dashboard-navbar">
      {/* Left side: Logo and Menu Icon */}
      <div className="navbar-left">
        <img src="/path-to-logo.png" alt="Logo" className="navbar-logo" />
        <button className="menu-icon">
          <i className="fas fa-bars"></i> {/* FontAwesome menu icon */}
        </button>
      </div>

      {/* Center: Search bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search" />
        <i className="fas fa-search"></i> {/* FontAwesome search icon */}
      </div>

      {/* Right side: Notifications and user profile */}
      <div className="navbar-right">
        <div className="navbar-notifications">
          <i className="fas fa-bell"></i> {/* FontAwesome bell icon */}
          <span className="notification-dot"></span>
        </div>
        <div className="navbar-profile">
          <img src="/path-to-profile-pic.jpg" alt="Profile" className="profile-pic" />
          <span>Welcome Smith</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
