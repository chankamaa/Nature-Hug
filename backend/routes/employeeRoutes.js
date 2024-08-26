import express from 'express';
import {
  addEmployee,
  getEmployees,
  getSalaries,
  getEPFETFContributions,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateEmployeeSalary
} from '../controllers/employeeController.js';

const router = express.Router();

// Route to add an employee (POST request)
router.post('/employees', addEmployee);

// Route to get all employees (GET request)
router.get('/employees', getEmployees);

// Route to get salary data for all employees (GET request)
router.get('/employees/salaries', getSalaries);

// Route to get EPF & ETF contributions for all employees (GET request)
router.get('/employees/epf-etf', getEPFETFContributions);

// Route to get a specific employee by ID (GET request)
router.get('/employees/:id', getEmployeeById);

// Route to update an existing employee by ID (PUT request)
router.put('/employees/:id', updateEmployee);

// Route to delete an employee by ID (DELETE request)
router.delete('/employees/:id', deleteEmployee);

router.put('/employees/:id/salary', updateEmployeeSalary);

export default router;
