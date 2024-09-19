import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-cso">
      <ul>
        <li><Link to="/cso/dashboard">Dashboard</Link></li>
        <li><Link to="/cso/time-book">Time Book</Link></li>

        {/* Add the Attendance Search Link here */}
        <li><Link to="/cso/attendance-search">Search Attendance</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
