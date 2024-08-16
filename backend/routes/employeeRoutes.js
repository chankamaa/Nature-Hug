import express from 'express';
import { addEmployee, getEmployees } from '../controllers/employeeController.js';

const router = express.Router();

// Route to add an employee (POST request)
router.post('/employees', addEmployee);

// Route to get all employees (GET request)
router.get('/employees', getEmployees);

export default router;
