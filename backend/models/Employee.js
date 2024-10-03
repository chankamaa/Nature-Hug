import mongoose from 'mongoose';

// Initialize the employee counter (for generating unique empId)
let empCounter = 0;  // This is a simple counter. For production, you may want to store it in the database.

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    default: 0,
  },
  allowances: {
    type: Number,
    default: 0,
  },
  epfEmployee: {  // 8% paid by employee
    type: Number,
    default: 0,
  },
  epfCompany: {  // 12% paid by company
    type: Number, 
    default: 0 
  },
  etf: {  // 3% paid by company
    type: Number,
    default: 0,
  },
  apit: { 
    type: Number, 
    default: 0 
  },
  salaryAdvance: {
    type: Number,
    default: 0,
  },
  noPayLeave: {
    type: Number,
    default: 0,
  },
  totalSalary: {
    type: Number,
    default: function () {
      return this.basicSalary + this.allowances;
    },
  },
  NICNumber: {
    type: String,
    required: true,
    unique: true,
  },
  bithday: {
    type: Date,
    required: true,
  },
  totalDeductions: {
    type: Number,
    default: 0,
  },
  totalContribution: {
    type: Number,
    default: function () {
      return this.epfCompany + this.etf;
    },
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  empId: {
    type: String,
    unique: true,
  },
});

// Helper function to calculate APIT (tax)
const calculateAPIT = (salary) => {
  let tax = 0;
  if (salary > 308333) {
    tax += (salary - 308333) * 0.36;
    salary = 308333;
  }
  if (salary > 266667) {
    tax += (salary - 266667) * 0.30;
    salary = 266667;
  }
  if (salary > 225000) {
    tax += (salary - 225000) * 0.24;
    salary = 225000;
  }
  if (salary > 183333) {
    tax += (salary - 183333) * 0.18;
    salary = 183333;
  }
  if (salary > 141667) {
    tax += (salary - 141667) * 0.12;
    salary = 141667;
  }
  if (salary > 100000) {
    tax += (salary - 100000) * 0.06;
  }
  return tax;
};

employeeSchema.pre('save', function (next) {
  // Calculate APIT and contributions
  const epfEmployeeRate = 0.08;  // 8% paid by employee
  const epfCompanyRate = 0.12;  // 12% paid by company
  const etfRate = 0.03;         // 3% paid by company
  const apit = calculateAPIT(this.basicSalary); 

  // Generate the unique empId
  const year = this.joiningDate.getFullYear().toString().slice(-2);  // e.g., 2024 -> '24'
  const month = ('0' + (this.joiningDate.getMonth() + 1)).slice(-2); // e.g., 07 for July
  
  // Increment the employee counter
  empCounter += 1;

  // Ensure the counter is 4 digits long
  const uniqueId = ('0000' + empCounter).slice(-4);

  // Generate the empId by combining year, month, and uniqueId
  this.empId = `${year}${month}${uniqueId}`;

  // Calculate APIT, EPF, and ETF
  this.apit = apit;
  this.epfEmployee = this.basicSalary * epfEmployeeRate;
  this.epfCompany = this.basicSalary * epfCompanyRate;
  this.etf = this.basicSalary * etfRate;

  // Calculate total deductions (employee's APIT, EPF, salary advance, and no-pay leave)
  this.totalDeductions = apit + this.epfEmployee + (this.salaryAdvance || 0) + (this.noPayLeave || 0);

  // Calculate total salary after deductions
  this.totalSalary = this.basicSalary + this.allowances - this.totalDeductions;

  // Calculate total contributions (company's EPF and ETF)
  this.totalContribution = this.epfCompany + this.etf;

  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
