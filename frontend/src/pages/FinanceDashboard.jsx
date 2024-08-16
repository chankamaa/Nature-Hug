import React from 'react';
import EmployeeAddForm from '../components/finance/EmployeeAddForm';
import FinanceSidebar from '../components/finance/FinanceSidebar';


const FinanceDashboard = () => {
  return (
    <div className="finance-dashboard">
      <FinanceSidebar />
      <div className="finance-content">
        <h1>Finance Dashboard</h1>
        <EmployeeAddForm />
        
      </div>
    </div>
  );
};

export default FinanceDashboard;
