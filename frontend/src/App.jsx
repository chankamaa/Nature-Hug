import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Cart from './pages/Cart/cart';
import Step01 from './pages/OrderStep01/Step01';
import Step03 from './pages/OrderStep03/Step03';
import Step04 from './pages/OrderStep04/Step04';
import Order from './pages/Order/order';
import Myorders from './pages/Myorders/Myorders';
import Aboutus from './pages/AboutUs/Aboutus';
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import FinanceDashboard from './pages/FinanceDashboard'
import SalaryDashboard from './components/finance/SalaryDashboard'
import EPFETFManagement from './components/finance/EPFETFManagement'
import EmployeeAddForm from './components/finance/EmployeeAddForm'

import Product from './pages/Product/product'
import AdminDashboard from './pages/AdminDashboard';
import EmployeeEditForm from './components/finance/EmployeeEditForm';
import EmployeeList from './components/finance/EmployeeList'




const App=() =>{
  return (

    <>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path="/Cart" element={<Cart />} />
        <Route path="/Order" element={<Order />} />
        <Route path='/finance/dashboard' element={<FinanceDashboard />} />
        <Route path='/finance/add-employee' element={<EmployeeAddForm />} />
        <Route path='/finance/salary-dashboard' element={<SalaryDashboard />} />
        <Route path='/finance/epf-etf-management' element={<EPFETFManagement />} />

        <Route path="/employees/edit/:id" element={<EmployeeEditForm />} />
        <Route path="/employees" element={<EmployeeList />} />

        <Route path="/Step01" element={<Step01 />} />
        <Route path="/Step03" element={<Step03 />} />
        <Route path="/Step04" element={<Step04 />} />
        <Route path="/Aboutus" element={<Aboutus />} />

        <Route path="/myorders" element={<Myorders />} />

        <Route path='/product'element={<Product />} />
        <Route path='/admin' element={<AdminDashboard />} />

      </Routes>
      
    </div>
    <Footer />
    </>
  )

} 

export default  App
