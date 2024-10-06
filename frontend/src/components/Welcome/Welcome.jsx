// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Welcome.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();  // Initialize navigate

  const goToProducts = () => {
    navigate('/product');  // Navigate to the product page
  };
  return (
    <div className='header'>
        
        <div className="main-heading">
            <h1>Bigger, Better, Leafier, Gloomier</h1>
            <h3>We’re here to help you and your plants thrive together.</h3>
            
        </div>
        <div className="main-image">
        <img src={assets.Welcome_img} alt="welcome" />
        </div>
        <button onClick={goToProducts}>Shop Plants</button>
        
    </div>
  )
}

export default Welcome