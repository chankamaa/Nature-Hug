/* eslint-disable no-unused-vars */
import React from 'react'
import Dashboard from '../../components/Dash/Dashboard'
import './Instocks.css'


const Instocks = () => {

    return(
      <div  >
  <Dashboard/>
  <div className='milan'>
    <form onSubmit={''}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={''}
          onChange={''}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={''}
          onChange={''}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={''}
          onChange={''}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>


 </div>

  </div>
    )
  
  
  }
    
  
  export default Instocks
