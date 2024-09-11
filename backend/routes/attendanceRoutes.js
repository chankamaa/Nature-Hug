import express from 'express';
import { punchIn, punchOut, getTodayAttendance, getAttendanceRecords } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/attendance/punch-in', punchIn);
router.post('/attendance/punch-out', punchOut);
router.get('/attendance/today', getTodayAttendance);
router.get('/attendance', getAttendanceRecords);

export default router;
