import React from 'react';
import './DashboardCard.css'; // Create a CSS file for styling

const DashboardCard = ({ title, count, color, icon }) => {
  return (
    <div className="dashboard-card" style={{ backgroundColor: color }}>
      <div className="card-content">
        <h3>{title}</h3>
        <div className="card-info">
          <span className="card-count">{count}</span>
          <span className="card-icon">
            <img src={icon} alt={`${title} icon`} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
