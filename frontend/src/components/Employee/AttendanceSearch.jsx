import React, { useState, useContext } from 'react'; // Import useContext
import axios from 'axios';
import './AttendanceSearch.css';
import Sidebar from './Sidebar';
import { StoreContext } from '../../context/StoreContext'; // Import StoreContext

const AttendanceSearch = () => {
  const [empId, setEmpId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { url } = useContext(StoreContext); // Use useContext to get the `url` value

  const handleSearch = async () => {
    // Check if either empId or date is provided
    if (!empId && !date) {
      setErrorMessage('Please enter a valid Employee ID or Date.');
      return;
    }

    try {
      const params = new URLSearchParams();

      // Add date and empId to query parameters based on user input
      if (date) {
        params.append('date', date);
      }
      if (empId) {
        params.append('empId', empId);
      }

      const response = await axios.get(`${url}/api/attendance?${params.toString()}`);
      setAttendanceRecords(response.data);  // Update state with fetched records
      setErrorMessage('');  // Clear any previous errors
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setErrorMessage('Error fetching attendance records');
    }
  };

  return (
    <div className="attendance-search">
      <Sidebar />
      <h2>Search Employee Attendance History</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display error message */}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Display attendance records */}
      {attendanceRecords.length > 0 && (
        <table className='table'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Punch In</th>
              <th>Punch Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.empId}</td>
                <td>{record.date}</td>
                <td>{record.punchInTime || 'N/A'}</td>
                <td>{record.punchOutTime || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceSearch;
