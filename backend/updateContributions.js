import mongoose from 'mongoose';
import Employee from './models/Employee.js';
import { connectDB } from './config/db.js'; // Adjust this path based on your project structure

const updateEmployeeContributions = async () => {
  await connectDB();  // Connect to the database

  try {
    const employees = await Employee.find();
    for (const employee of employees) {
      await employee.save(); // This will trigger the `pre('save')` middleware
    }

    console.log('Employee contributions updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating employee contributions:', error);
    process.exit(1);
  }
};

updateEmployeeContributions();
