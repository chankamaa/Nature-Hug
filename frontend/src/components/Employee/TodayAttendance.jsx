import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TodayAttendance.css';

const TodayAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      try {
        const response = await axios.get('/api/attendance/today');
        console.log('API Response:', response.data); // Log response data
        setAttendanceList(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching today\'s attendance:', error);
        setError('Error fetching today\'s attendance');
        setLoading(false);
      }
    };

    fetchTodayAttendance();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="today-attendance">
      <h2>Today's Attendance</h2>

      {attendanceList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((record) => (
              <tr key={record.empId}>
                <td>{record.empId}</td>
                <td>{record.status}</td>
                <td>{record.time}</td>
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
