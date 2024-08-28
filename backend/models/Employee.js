import mongoose from 'mongoose';


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
    required: true,
  },
  allowances: {
    type: Number,
    default: 0,
  },
  epfEmployee: {  //8% paid by employee
    type: Number,
    default: 0,
  },
  epfCompany: {    //12% by company
    type: Number, 
    default: 0 
  },
  etf: {          //3% paid by company
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
  totalDeductions: {
    type: Number,
    default: 0,
  },
  totalContribution: {
    type: Number,
    default: function () {
      return this.epf + this.etf;
    },
  },
  joiningDate: {
    type: Date,
    required: true,
  }
});

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
  const epfEmployeeRate = 0.08; // 8% paid by employee
  const epfCompanyRate = 0.12;  // 12% paid by company
  const etfRate = 0.03;         // 3% paid by employer
  const apit = calculateAPIT(this.basicSalary); 

  this.apit = apit;

  this.epfEmployee = this.basicSalary * epfEmployeeRate;
  this.epfCompany = this.basicSalary * epfCompanyRate;
  this.etf = this.basicSalary * etfRate;

  // Calculate total deductions (employee contributions and taxes)
  this.totalDeductions = apit + this.epfEmployee + (this.salaryAdvance || 0) + (this.noPayLeave || 0);

  // Update total salary after deductions
  this.totalSalary = this.basicSalary + this.allowances - this.totalDeductions;

  // Update total contributions (company's contributions only)
  this.totalContribution = this.epfCompany + this.etf;

  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
