import React from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import FinanceDashboard from './pages/FinanceDashboard'
import SalaryDashboard from './components/finance/SalaryDashboard'
import EPFETFManagement from './components/finance/EPFETFManagement'
import EmployeeAddForm from './components/finance/EmployeeAddForm'
import EmployeeEditForm from './components/finance/EmployeeEditForm';
import EmployeeList from './components/finance/EmployeeList'

const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/finance/dashboard' element={<FinanceDashboard />} />
        <Route path='/finance/add-employee' element={<EmployeeAddForm />} />
        <Route path='/finance/salary-dashboard' element={<SalaryDashboard />} />
        <Route path='/finance/epf-etf-management' element={<EPFETFManagement />} />
        <Route path="/employees/edit/:id" element={<EmployeeEditForm />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
      
    </div>
    <Footer />
    </>
  )
}

export default App