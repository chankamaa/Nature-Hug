import React from 'react';
import { NavLink } from 'react-router-dom';
import './FinanceSidebar.css';

const FinanceSidebar = () => {
  return (
    <div className="finance-sidebar">
      <h2 className="sidebar-title">Finance Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink 
            to="/finance/add-employee" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Add Employee
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/finance/salary-dashboard" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Salary Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/finance/epf-etf-management" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            EPF & ETF Management
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default FinanceSidebar;
