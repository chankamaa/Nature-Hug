import React, { useContext, useEffect, useState } from 'react';
import FinanceSidebar from '../components/finance/FinanceSidebar';
import './FinanceDashboard.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const FinanceDashboard = () => {
  const { url } = useContext(StoreContext);
  const [totalSalaries, setTotalSalaries] = useState(0);
  const [totalEPF, setTotalEPF] = useState(0);
  const [totalETF, setTotalETF] = useState(0);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const salaryResponse = await axios.get(`${url}/finance/total-salaries`);
        const epfResponse = await axios.get(`${url}/finance/total-epf`);
        const etfResponse = await axios.get(`${url}/finance/total-etf`);

        setTotalSalaries(salaryResponse.data.total);
        setTotalEPF(epfResponse.data.total);
        setTotalETF(etfResponse.data.total);
      } catch (error) {
        console.error('Error fetching finance data:', error);
      }
    };

    fetchFinanceData();
  }, [url]);

  return (
    <div className="finance-dashboard">
      <FinanceSidebar />
      <div className="dashboard-content">
        <h2>Finance Overview</h2>
        <div className="summary-cards">
          <div className="card">
            <h3>Total Salaries</h3>
            <p>Rs.{totalSalaries}</p>
          </div>
          <div className="card">
            <h3>EPF Contributions</h3>
            <p>Rs.{totalEPF}</p>
          </div>
          <div className="card">
            <h3>ETF Contributions</h3>
            <p>Rs.{totalETF}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
