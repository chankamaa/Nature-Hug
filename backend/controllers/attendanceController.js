import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';  // Ensure Employee model is imported

// Punch In with Late or Punctual Check
export const punchIn = async (req, res) => {
    const { empId } = req.body;
    const today = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD format
  
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
      const officeStartTime = new Date();
      officeStartTime.setHours(8, 0, 0);  // 8:00 AM
  
      // Determine if the employee is late
      let status = 'Punctual';
      if (currentTime > officeStartTime) {
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
  const today = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD format

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
    const totalWorkingHours = (currentTime - new Date(existingRecord.punchInTime)) / (1000 * 60 * 60);

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


// Get Today's Attendance
export const getTodayAttendance = async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);  // Get the date in YYYY-MM-DD format

  try {
    // Fetch all attendance records for today
    const attendanceRecords = await Attendance.find({ date: today });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching today\'s attendance', error });
  }
};


// API Route to Get Attendance Data
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
