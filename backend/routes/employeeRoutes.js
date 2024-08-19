import express from 'express';
import { addEmployee, getEmployees, getSalaries, getEPFETFContributions } from '../controllers/employeeController.js';



const router = express.Router();

// Route to add an employee (POST request)
router.post('/employees', addEmployee);

// Route to get all employees (GET request)
router.get('/employees', getEmployees);

// Route to get salary data for all employees (GET request)
router.get('/employees/salaries', getSalaries);  

// router.get('/employees/epf-etf', getEPFETFContributions);
router.get('/employees/epf-etf', getEPFETFContributions);




export default router;
