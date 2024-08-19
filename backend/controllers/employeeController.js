import Employee from '../models/Employee.js';  // Assuming you have an Employee model

// Controller to add a new employee
export const addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

// Controller to get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees from the database
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};


// Controller to get salary data for all employees

export const getSalaries = async (req, res) => {
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

export const getEPFETFContributions = async (req, res) => {
  try {
    const employees = await Employee.find({}, 'fullName department epf etf');  // Adjust fields as necessary
    const contributions = employees.map(employee => {
      return {
        ...employee._doc,
        totalContribution: employee.epf + employee.etf
      };
    });
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching EPF/ETF data', error });
  }
};

