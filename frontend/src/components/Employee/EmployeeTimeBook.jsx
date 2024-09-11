import React, { useState, useContext } from 'react';
import axios from 'axios';
import './EmployeeTimeBook.css';
import Sidebar from './Sidebar'; 
import { StoreContext } from '../../context/StoreContext';  // Correctly import StoreContext

const EmployeeTimeBook = () => {
  const [empId, setEmpId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Use useContext to get the URL from StoreContext
  const { url } = useContext(StoreContext);  

  const handlePunchIn = async () => {
    if (!empId) {
      setStatusMessage('Please enter a valid Employee ID');
      return;
    }
    setLoading(true);  // Start loading
    try {
      const response = await axios.post(`${url}/api/attendance/punch-in`, { empId });
      setStatusMessage(`Employee ${empId} punched in successfully!`);
    } catch (error) {
      // Use detailed error message for better feedback
      setStatusMessage(error.response?.data?.message || 'Error punching in.');
      console.error('Punch-in error:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const handlePunchOut = async () => {
    if (!empId) {
      setStatusMessage('Please enter a valid Employee ID');
      return;
    }
    setLoading(true);  // Start loading
    try {
      const response = await axios.post(`${url}/api/attendance/punch-out`, { empId });
      setStatusMessage(`Employee ${empId} punched out successfully!`);
    } catch (error) {
      // Use detailed error message for better feedback
      setStatusMessage(error.response?.data?.message || 'Error punching out.');
      console.error('Punch-out error:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="employee-time-book-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="employee-time-book-container">
        <h2>Employee Time-Book</h2>

        <div className="card-container">
          {/* Punch In Card */}
          <div className="card punch-in-card">
            <h3>Punch In</h3>
            <input
              type="text"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="Enter Employee ID"
              className="input-box"
              disabled={loading}  // Disable input when loading
            />
            <button onClick={handlePunchIn} className="button punch-in-button" disabled={loading}>
              {loading ? 'Processing...' : 'Sign In'}
            </button>
          </div>

          {/* Punch Out Card */}
          <div className="card punch-out-card">
            <h3>Punch Out</h3>
            <input
              type="text"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="Enter Employee ID"
              className="input-box"
              disabled={loading}  // Disable input when loading
            />
            <button onClick={handlePunchOut} className="button punch-out-button" disabled={loading}>
              {loading ? 'Processing...' : 'Sign Out'}
            </button>
          </div>
        </div>

        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default EmployeeTimeBook;
