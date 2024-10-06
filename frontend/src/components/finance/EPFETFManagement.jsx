import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './EPFETFManagement.css';
import DashboardNavbar from '../Employee/DashboardNavbar';


const EPFETFManagement = () => {
  const { url } = useContext(StoreContext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get(`${url}/api/employees/epf-etf`);
        console.log('Fetched contributions:', response.data);
        setContributions(response.data);
      } catch (error) {
        console.error('Error fetching EPF/ETF data:', error);
      }
    };

    fetchContributions();
  }, [url]);

  return (
    <div className="epf-etf-management">
      <DashboardNavbar />

      <h2>EPF & ETF Management</h2>
      <table className="contribution-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>EPF (Employee Paid - 8%)</th>
            <th>EPF (Company Paid - 12%)</th>
            <th>ETF (Company Paid - 3%)</th>
            <th>Total Contribution</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution) => (
            <tr key={contribution._id}>
              <td>{contribution.fullName}</td>
              <td>{contribution.department}</td>
              <td>{(contribution.epfEmployee || 0).toFixed(2)}</td>
              <td>{(contribution.epfCompany || 0).toFixed(2)}</td>
              <td>{(contribution.etf || 0).toFixed(2)}</td>
              <td>{((contribution.epfEmployee || 0) + (contribution.epfCompany || 0) + (contribution.etf || 0)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EPFETFManagement;
