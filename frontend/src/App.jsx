// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'

import InventoryDashboard from './pages/Inventory/InventoryDashboard'
import Suppliers from './pages/Inventory/Suppliers'

import Das from './pages/Inventory/Das'
import ADDstocks from './pages/Inventory/ADDstocks'

const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/InventoryDashboard' element={<InventoryDashboard/>} />
        <Route path='/Suppliers' element={<Suppliers/>} />
        <Route path='/ADDstocks' element={<ADDstocks/>} />
        <Route path='/Das' element={<Das/>} />
      </Routes>
      
    </div>
   
    </>
  )
}

export default App