import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    empId: { type: String, required: true },
    date: { type: String, required: true },  // Date in YYYY-MM-DD format
    punchInTime: { type: Date, required: true },
    punchOutTime: { type: Date, default: null },
    status: { type: String, default: 'Punctual' },  // Late or Punctual
    totalWorkingHours: { type: Number, default: 0 },  // Working hours in decimal
    workingStatus: { type: String, default: '' },  // Insufficient or Completed working hours
    isLate: {type: Boolean, default: false }
  });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;