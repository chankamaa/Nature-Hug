import React, { useContext, useEffect, useState } from 'react';
import FinanceSidebar from '../components/finance/FinanceSidebar';
import './FinanceDashboard.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import SalaryChart from '../components/finance/SalaryChart';
import DashboardNavbar from '../components/Employee/DashboardNavbar';


const FinanceDashboard = () => {
  const { url } = useContext(StoreContext);
  const [totalSalaries, setTotalSalaries] = useState(0);
  const [totalEPF, setTotalEPF] = useState(0);
  const [totalETF, setTotalETF] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFinanceData();
  }, [url]);

  const fetchFinanceData = async () => {
    setLoading(true);
    setError('');
    try {
      const salaryResponse = await axios.get(`${url}/api/finance/total-salaries`);
      const epfResponse = await axios.get(`${url}/api/finance/total-epf`);
      const etfResponse = await axios.get(`${url}/api/finance/total-etf`);

      setTotalSalaries(salaryResponse.data.total);
      setTotalEPF(epfResponse.data.total);
      setTotalETF(etfResponse.data.total);
    } catch (error) {
      console.error('Error fetching finance data:', error);
      setError('Failed to load finance data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredData = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${url}/api/finance/filtered-salaries`, {
        params: {
          startDate,
          endDate,
        },
      });

      setTotalSalaries(response.data.total);

      const epfResponse = await axios.get(`${url}/api/finance/filtered-epf`, {
        params: {
          startDate,
          endDate,
        },
      });
      setTotalEPF(epfResponse.data.total);

      const etfResponse = await axios.get(`${url}/api/finance/filtered-etf`, {
        params: {
          startDate,
          endDate,
        },
      });
      setTotalETF(etfResponse.data.total);

    } catch (error) {
      console.error('Error fetching filtered data:', error);
      setError('Failed to filter finance data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    fetchFinanceData();
  };

  return (
    <div className="finance-dashboard">
      <FinanceSidebar />
      <DashboardNavbar />
      
      <div className="dashboard-content">
        <h2>Finance Overview</h2>


        <div className="filter-section">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button className='btn btn-1' onClick={fetchFilteredData}>Filter Data</button>
          <button onClick={clearFilter} className="btn clear-filter-btn btn-2">Clear Filter</button>
        </div>


        {loading && <p>Loading data...</p>}
        {error && <p className="error-message">{error}</p>}


        {!loading && !error && (
          <SalaryChart 
            totalSalaries={totalSalaries} 
            totalEPF={totalEPF} 
            totalETF={totalETF}
          />
        )}


        <div className="summary-cards">
          <div className="card-tot">
            <h3>Total Salaries</h3>
            <p>Rs.{totalSalaries}</p>
          </div>
          <div className="card-tot">
            <h3>EPF Contributions</h3>
            <p>Rs.{totalEPF}</p>
          </div>
          <div className="card-tot">
            <h3>ETF Contributions</h3>
            <p>Rs.{totalETF}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
