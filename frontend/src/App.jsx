// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import InventoryDashboard from './pages/Inventory/InventoryDashboard'
import Suppliers from './pages/Inventory/Suppliers'
import Instocks from './pages/Inventory/Instocks'
import Das from './pages/Inventory/Das'

const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/InventoryDashboard' element={<InventoryDashboard/>} />
        <Route path='/Suppliers' element={<Suppliers/>} />
        <Route path='/Instocks' element={<Instocks/>} />
        <Route path='/Das' element={<Das/>} />
      </Routes>
      
    </div>
    <Footer />
    </>
  )
}

export default App