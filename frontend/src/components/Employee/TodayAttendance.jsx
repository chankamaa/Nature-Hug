import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import AutoTable for table generation in PDF
import './TodayAttendance.css';
import { StoreContext } from '../../context/StoreContext'; // Import StoreContext
import natureHugLogo from '../../../public/nature-hug-logo-base64'; // Base64-encoded image for logo
import { assets } from '../../assets/assets';

const TodayAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { url } = useContext(StoreContext); // Use the StoreContext to get the `url` value

  // Fetch today's attendance data
  useEffect(() => {
    const fetchTodayAttendance = async () => {
      try {
        const response = await axios.get(`${url}/api/attendance/today`);
        console.log('API Response:', response.data);

        if (response.data && response.data.attendanceRecords) {
          setAttendanceList(response.data.attendanceRecords);
        } else {
          setAttendanceList([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching today\'s attendance:', error);
        setError('Error fetching today\'s attendance');
        setLoading(false);
      }
    };

    fetchTodayAttendance();
  }, [url]);

  // PDF Generation Logic
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
    doc.addImage(natureHugLogo, 'PNG', 10, 10, 30, 30); // Adjust width and height as needed

    // Add company name and details
    doc.setFontSize(18);
    doc.text('NATURE HUG', 50, 15); // Add company name
    doc.setFontSize(12);
    doc.text('Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara.', 50, 25);
    doc.text('Email: handamama.pvt@gmail.com | Phone: +94 76 258 2337', 50, 30);

    // Add date
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 160, 20);

    // Title for the table
    doc.setFontSize(16);
    doc.text("Today's Attendance Report", 14, 50);

    // Table content
    const columns = ['Employee ID', 'Status', 'Punch In', 'Punch Out', 'Total Working Hours'];
    const rows = attendanceList.map(record => [
      record.empId,
      record.status,
      record.punchInTime ? new Date(record.punchInTime).toLocaleTimeString() : 'N/A',
      record.punchOutTime ? new Date(record.punchOutTime).toLocaleTimeString() : 'N/A',
      record.totalWorkingHours || 'N/A'
    ]);

    // Add the table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 60, // Starting Y position for the table
    });

    // Save the generated PDF
    doc.save(`${today}attendance-report.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="today-attendance">
      <h2>Today's Attendance</h2>

      {/* Download Icon for generating PDF */}
      <img
        src={assets.Download} // Path to your download icon
        alt="Download PDF"
        className="download-icon"
        onClick={generatePDF} // Trigger PDF generation on click
      />

      {/* Display Attendance Table */}
      {attendanceList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Status</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Total Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((record) => (
              <tr key={record._id}>
                <td>{record.empId}</td>
                <td>{record.status}</td>
                <td>{record.punchInTime ? new Date(record.punchInTime).toLocaleTimeString() : 'N/A'}</td>
                <td>{record.punchOutTime ? new Date(record.punchOutTime).toLocaleTimeString() : 'N/A'}</td>
                <td>{record.totalWorkingHours || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found for today.</p>
      )}
    </div>
  );
};

export default TodayAttendance;
