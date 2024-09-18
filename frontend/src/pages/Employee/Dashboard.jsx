import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TodayAttendance from '../../components/Employee/TodayAttendance';
import './Dashboard.css';
import Sidebar from '../../components/Employee/Sidebar';
import DashboardNavbar from '../../components/Employee/DashboardNavbar'; 
import DashboardCard from '../../components/Employee/DashboardCard'; // Import the DashboardCard component
import { assets } from '../../assets/assets';
import axios from 'axios';

const Dashboard = () => {
  // State variables to store attendance data
  const [punctualCount, setPunctualCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [attendanceRecords, setAttendanceRecords] = useState([]); // This will store the actual attendance records

  useEffect(() => {
    // Fetch today's attendance data from the backend
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/attendance/today');
        const attendanceData = response.data;

        console.log("API Response:", attendanceData); // Check if the data is structured as expected

        // Extract data from the API response
        const { attendanceRecords, punctualCount, lateCount, total } = attendanceData;

        // Update state with the received data
        setPunctualCount(punctualCount);
        setLateCount(lateCount);
        setTotalAttendance(total);
        setAttendanceRecords(attendanceRecords); // Set attendance records for use elsewhere
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

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

          {/* Card Section */}
          <div className="dashboard-cards">
            <DashboardCard 
              title="Punctual Today" 
              count={punctualCount} 
              color="#FFA500" 
              icon={assets.punctual}
            />
            <DashboardCard 
              title="Late Today" 
              count={lateCount} 
              color="#FF6347" 
              icon={assets.late} 
            />
            <DashboardCard 
              title="Today Attendance" 
              count={totalAttendance} 
              color="#32CD32" 
              icon={assets.attendance} 
            />
          </div>

          {/* Today's Attendance Component */}
          <TodayAttendance records={attendanceRecords} /> {/* Pass attendanceRecords to the component */}

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
