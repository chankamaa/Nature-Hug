// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'



const Dashboard = () => {

    return(

      <div>
        <aside className="sidebar">
        <h2>Inventory</h2>

        
        <Link to='/'><button className="nav-button">Dashboard</button></Link>
        <Link to='/Instocks'> <button className="nav-button">Stock</button></Link>
       <Link to='/Suppliers'> <button className="nav-button">Suppliers</button></Link>
       <Link to= '/Das'> <button className="nav-button">Invoice</button></Link>
        <button className="nav-button">Reports</button>
        <button className="nav-button">Support</button>
      </aside>
      
      </div>
    )
  
  
  }
    
  
  export default Dashboard
  