import React from 'react'
import './Welcome.css'
import { assets } from '../../assets/assets'

const Welcome = () => {
  return (
    <div className='header'>
        
        <div className="main-heading">
            <h1>Bigger, Better, Leafier, Gloomier</h1>
            <h3>We’re here to help you and your plants thrive together.</h3>
            
        </div>
        <div className="main-image">
        <img src={assets.Welcome_img} alt="welcome" />
        </div>
        <button>Shop Plants</button>
        
    </div>
  )
}

export default Welcome