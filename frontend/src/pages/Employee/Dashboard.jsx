import React from 'react';
import { Link } from 'react-router-dom';
import TodayAttendance from '../../components/Employee/TodayAttendance';
import './Dashboard.css';
import Sidebar from '../../components/Employee/Sidebar';
import DashboardNavbar from '../../components/Employee/DashboardNavbar'; // Import the newly created Dashboard Navbar

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Add the DashboardNavbar */}
      <DashboardNavbar />

      <div className="dashboard-layout">
        {/* Sidebar Section */}
        <Sidebar />

        {/* Main Content Section */}
        <div className="dashboard-main-content">
          <h1>Welcome to the Dashboard</h1>
          
          {/* Today's Attendance Component */}
          <TodayAttendance />

          {/* Attendance Search Link */}
          <div className="attendance-search-link">
            <Link to="/cso/attendance-search">Search Attendance History</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
