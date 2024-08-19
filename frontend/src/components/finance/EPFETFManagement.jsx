import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './EPFETFManagement.css';

const EPFETFManagement = () => {
  const { url } = useContext(StoreContext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get(`${url}/api/employees/epf-etf`);
        setContributions(response.data);
      } catch (error) {
        console.error('Error fetching EPF/ETF data:', error);
      }
    };

    fetchContributions();
  }, [url]);

  return (
    <div className="epf-etf-management">
      <h2>EPF & ETF Management</h2>
      <table className="contribution-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>EPF Contribution</th>
            <th>ETF Contribution</th>
            <th>Total Contribution</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution) => (
            <tr key={contribution._id}>
              <td>{contribution.fullName}</td>
              <td>{contribution.department}</td>
              <td>{contribution.epf}</td>
              <td>{contribution.etf}</td>
              <td>{contribution.totalContribution}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EPFETFManagement;
