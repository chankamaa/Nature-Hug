import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './AttendanceSearch.css';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import AutoTable
import Sidebar from './Sidebar';
import { StoreContext } from '../../context/StoreContext'; // Import StoreContext
import DashboardNavbar from './DashboardNavbar';
import natureHugLogo from '../../../public/nature-hug-logo-base64'; // Import the base64-encoded image

const AttendanceSearch = () => {
  const [empId, setEmpId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { url } = useContext(StoreContext); // Use useContext to get the `url` value

  useEffect(() => {
    const storedEmpId = localStorage.getItem('empId');
    const storedDate = localStorage.getItem('date');
    const storedAttendanceRecords = localStorage.getItem('attendanceRecords');

    if (storedEmpId) setEmpId(storedEmpId);
    if (storedDate) setDate(storedDate);
    if (storedAttendanceRecords) {
      setAttendanceRecords(JSON.parse(storedAttendanceRecords)); // Parse stored records from JSON
    }
  }, []);

  const fetchAttendanceRecords = async (empId, date) => {
    try {
      const params = new URLSearchParams();

      if (date) {
        params.append('date', date);
      }
      if (empId) {
        params.append('empId', empId);
      }

      const response = await axios.get(`${url}/api/attendance?${params.toString()}`);
      const records = response.data;

      setAttendanceRecords(records);
      setErrorMessage('');

      localStorage.setItem('empId', empId || '');
      localStorage.setItem('date', date || '');
      localStorage.setItem('attendanceRecords', JSON.stringify(records)); // Store as JSON string
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setErrorMessage('Error fetching attendance records');
    }
  };

  const handleSearch = () => {
    if (!empId && !date) {
      setErrorMessage('Please enter a valid Employee ID or Date.');
      return;
    }

    fetchAttendanceRecords(empId, date);
  };

  // Function to format the date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to format time as HH:MM:SS
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Function to generate the PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add company logo and details using base64-encoded image
    const logoWidth = 30;  // Adjust the width of the logo
    const logoHeight = 30; // Adjust the height of the logo

    doc.addImage(natureHugLogo, 'PNG', 10, 10, logoWidth, logoHeight); // Use base64 image data
    doc.setFontSize(18);
    doc.text('NATURE HUG', 50, 15); // Add company name
    doc.setFontSize(12);
    doc.text('Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara.', 50, 25);
    doc.text('Email: handamama.pvt@gmail.com | Phone: +94 76 258 2337', 50, 30);

    // Add the current date
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 160, 10);

    // Add title
    doc.setFontSize(16);
    doc.text('Attendance Report', 14, 50);

    // Define table columns and rows
    const columns = ['Employee ID', 'Date', 'Punch In', 'Punch Out'];
    const rows = attendanceRecords.map((record) => [
      record.empId,
      formatDate(record.date),
      record.punchInTime ? formatTime(record.punchInTime) : 'N/A',
      record.punchOutTime ? formatTime(record.punchOutTime) : 'N/A',
    ]);

    // Add the table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 60,
    });

    // Save the PDF
    doc.save('attendance-report.pdf');
  };

  return (
    <div className="attendance-search">
      <DashboardNavbar />
      <Sidebar />
      
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
        <button onClick={generatePDF}>Generate PDF</button> {/* Button to generate PDF */}
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
                <td>{formatDate(record.date)}</td> {/* Format date as dd/mm/yyyy */}
                <td>{record.punchInTime ? formatTime(record.punchInTime) : 'N/A'}</td> {/* Format punch in as HH:MM:SS */}
                <td>{record.punchOutTime ? formatTime(record.punchOutTime) : 'N/A'}</td> {/* Format punch out as HH:MM:SS */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceSearch;
