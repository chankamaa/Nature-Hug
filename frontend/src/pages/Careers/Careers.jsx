
import React from 'react';
import './Careers.css'; // Optional, for styling
import careersImage from '../../assets/careers.png';

const Careers = () => {
  return (
    <div className="careers-page">
        <br></br> <br></br>
      <div className="careers-content">
        <h1>Careers at Nature Hug</h1>
        <br></br> <br></br>
        <p className="vision">
          Our vision is a world where people and nature thrive together.
        </p>
        <p className="mission">
          We're here to help people embrace green living and promote sustainable solutions. Come join us!
        </p>
        <br></br> <br></br>
        <div className="recruiting-logo">
        <img src={careersImage} alt="Nature Hug Recruiting" />

          <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
        </div>
      </div>
    </div>
  );
};

export default Careers;
