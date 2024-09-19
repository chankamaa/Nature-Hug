// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'



const Dashboard = () => {

    return(

      <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
          <h2>Inventory</h2>
          <ul>
              <li><Link to='/'><button>Dashboard</button></Link></li>
              <li><Link to='/ADDstocks'><button>Stock</button></Link></li>
              <li><Link to='/Suppliers'><button>Suppliers</button></Link></li>
              <li><Link to='/Das'><button>Invoice</button></Link></li>
              <li><button>Reports</button></li>
              <li><button>Support</button></li>
          </ul>
      </aside>

      
      </div>
    )
  
  
  }
    
  
  export default Dashboard
  