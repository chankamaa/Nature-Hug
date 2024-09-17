import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalaryChart = ({ totalSalaries, totalEPF, totalETF }) => {
  const data = {
    labels: ['Salaries', 'EPF Contributions', 'ETF Contributions'],
    datasets: [
      {
        label: 'Total Amounts',
        data: [totalSalaries, totalEPF, totalETF],
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
      },
    ],
  };

  return (
    <div>
      <h3>Finance Overview Chart</h3>
      <Bar data={data} />
    </div>
  );
};

export default SalaryChart;
