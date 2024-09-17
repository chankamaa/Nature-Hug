import Employee from '../models/Employee.js';  // Assuming you have an Employee model
import nodemailer from 'nodemailer';

// Controller to add a new employee
const addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    // Send email after the employee is saved
    await sendEmail(newEmployee.email, newEmployee.empId);
    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

// Controller to get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees from the database
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};


// Controller to get salary data for all employees

const getSalaries = async (req, res) => {
  try {
    const employees = await Employee.find({}, 'fullName position department basicSalary allowances');  // Adjust fields as necessary
    const employeeData = employees.map(employee => {
      return {
        ...employee._doc,
        totalSalary: employee.basicSalary + employee.allowances
      };
    });
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salary data', error });
  }
};

const getEPFETFContributions = async (req, res) => {
  try {
    const employees = await Employee.find({}, 'fullName department epfEmployee epfCompany etf totalContribution');  // Fetch the relevant fields
    res.status(200).json(employees); // Send the data directly without additional mapping
  } catch (error) {
    res.status(500).json({ message: 'Error fetching EPF/ETF data', error });
  }
};

// Update employee details
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const calculateAPIT = (salary) => {
  let apit = 0;
  if (salary > 308333) {
    apit = salary * 0.36;
  } else if (salary > 266667) {
    apit = salary * 0.30;
  } else if (salary > 225000) {
    apit = salary * 0.24;
  } else if (salary > 183333) {
    apit = salary * 0.18;
  } else if (salary > 141667) {
    apit = salary * 0.12;
  } else if (salary > 100000) {
    apit = salary * 0.06;
  }
  return apit;
};

const updateEmployeeSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const apit = calculateAPIT(employee.basicSalary);
    const epfEmployee = employee.basicSalary * 0.08;
    const epfCompany = employee.basicSalary * 0.12;
    const etf = employee.basicSalary * 0.03;

    employee.apit = apit;
    employee.epfEmployee = epfEmployee;
    employee.epfCompany = epfCompany;
    employee.etf = etf;
    employee.totalDeductions = apit + epfEmployee;
    employee.totalSalary = employee.basicSalary + employee.allowances - employee.totalDeductions;

    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating salary', error });
  }
};

//empid send to the email
const sendEmail = async (email, empId) => {
  try {
    // Configure Nodemailer transport with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'handamama.pvt@gmail.com',  // Replace with your Gmail address
        pass: 'lhjhvwptabybkums',      // Generate an app password from Gmail
      },
    });

    // Email content
    const mailOptions = {
      from: 'handamama.pvt@gmail.com',        // Sender address
      to: email,                           // Employee's email
      subject: 'Welcome to the Company',   // Subject line
      text: `Dear Employee, \n\nWelcome to the company! Your employee ID is ${empId}.\n\nBest regards,\nCompany Team`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Export all functions, including the new one
export {
  addEmployee,
  getEmployees,
  getSalaries,
  getEPFETFContributions,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployeeSalary  // Ensure this is only exported once
};