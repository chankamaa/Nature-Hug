
export const calculateContributions = function(next) {
    // Calculate EPF (Assume EPF is 8% of basic salary)
    this.epf = this.basicSalary * 0.08;
    
    // Calculate ETF (Assume ETF is 3% of basic salary)
    this.etf = this.basicSalary * 0.03;
    
    // Calculate APIT (You will implement your own logic based on the tax table)
    const salary = this.basicSalary;
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
    this.apit = apit;
  
    // Deduct Salary Advance and No-Pay Leaves
    this.totalSalary = this.basicSalary + this.allowances - (this.apit + this.salaryAdvance + this.noPayLeave);
  
    // Calculate total contribution
    this.totalContribution = this.epf + this.etf;
  
    next();
  };
  