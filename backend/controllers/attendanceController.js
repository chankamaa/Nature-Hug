import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';  // Ensure Employee model is imported
import moment from 'moment';

// Punch In with Late or Punctual Check
export const punchIn = async (req, res) => {
    const { empId } = req.body;
    const today = moment().format('YYYY-MM-DD');  // YYYY-MM-DD format
  
    try {
      // Check if the Employee exists
      const employee = await Employee.findOne({ empId });
      if (!employee) {
        return res.status(400).json({ message: 'Employee ID not found' });
      }

      // Check if already punched in today
      const existingRecord = await Attendance.findOne({ empId, date: today });
      if (existingRecord) {
        return res.status(400).json({ message: 'Already punched in today' });
      }
  
      const currentTime = new Date();
      const officeStartTime = moment(today + ' 08:00', 'YYYY-MM-DD HH:mm'); // 8:00 AM as office start time
  
      // Determine if the employee is late
      let status = 'Punctual';
      if (moment(currentTime).isAfter(officeStartTime)) {
        status = 'Late';
      }
  
      const newAttendance = new Attendance({
        empId,
        punchInTime: currentTime,
        date: today,
        status,  // Store whether the employee was Punctual or Late
      });
  
      await newAttendance.save();
      res.status(200).json({ message: `Punched in successfully (${status})`, attendance: newAttendance });
    } catch (error) {
      res.status(500).json({ message: 'Error during punch in', error });
    }
  };


// Punch Out and calculate total working hours
export const punchOut = async (req, res) => {
  const { empId } = req.body;
  const today = moment().format('YYYY-MM-DD');  // Use moment to format date

  try {
    // Check if the Employee exists
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(400).json({ message: 'Employee ID not found' });
    }

    // Find today's attendance record
    const existingRecord = await Attendance.findOne({ empId, date: today });

    if (!existingRecord) {
      return res.status(400).json({ message: 'No punch-in record for today' });
    }

    if (existingRecord.punchOutTime) {
      return res.status(400).json({ message: 'Already punched out today' });
    }

    const currentTime = new Date();
    existingRecord.punchOutTime = currentTime;

    // Calculate total working hours (in milliseconds) and convert to hours
    const totalWorkingHours = moment.duration(moment(currentTime).diff(moment(existingRecord.punchInTime))).asHours();

    // If the total working hours is less than 8 hours
    const status = totalWorkingHours >= 8 ? 'Completed' : 'Insufficient';

    // Update the attendance with working hours and status
    existingRecord.totalWorkingHours = totalWorkingHours.toFixed(2);
    existingRecord.workingStatus = status;

    await existingRecord.save();

    res.status(200).json({ message: `Punched out successfully. Working hours: ${totalWorkingHours.toFixed(2)} hours`, attendance: existingRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error during punch out', error });
  }
};


// Get Today's Attendance with Counts of Punctual and Late
export const getTodayAttendance = async (req, res) => {
  const today = moment().format('YYYY-MM-DD');  // Use moment to get today's date

  try {
    // Fetch all attendance records for today
    const attendanceRecords = await Attendance.find({ date: today });

    // Calculate punctual and late counts
    const punctualCount = attendanceRecords.filter(record => record.status === 'Punctual').length;
    const lateCount = attendanceRecords.filter(record => record.status === 'Late').length;

    res.status(200).json({
      attendanceRecords,
      punctualCount,
      lateCount,
      total: attendanceRecords.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching today\'s attendance', error });
  }
};

// API Route to Get Attendance Data (Filtered by empId or Date)
export const getAttendanceRecords = async (req, res) => {
    const { empId, date } = req.query;
    
    try {
      let query = {};
  
      // If the date is provided, add it to the query
      if (date) {
        query.date = date;
      }
  
      // If empId is provided, add it to the query
      if (empId) {
        query.empId = empId;
      }
  
      // Fetch attendance records based on the query
      const attendanceRecords = await Attendance.find(query);
  
      // Return the records as a JSON response
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance records', error });
    }
};
