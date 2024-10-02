
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cart from './pages/Cart/cart';
import Step01 from './pages/OrderStep01/Step01';
import Step03 from './pages/OrderStep03/Step03';
import Step04 from './pages/OrderStep04/Step04';
import Order from './pages/Order/order';
import Myorders from './pages/Myorders/Myorders';
import Aboutus from './pages/AboutUs/Aboutus';
import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import FinanceDashboard from './pages/FinanceDashboard';
import SalaryDashboard from './components/finance/SalaryDashboard';
import EPFETFManagement from './components/finance/EPFETFManagement';
import EmployeeAddForm from './components/finance/EmployeeAddForm';
import Product from './pages/Product/product'
import AdminDashboard from './pages/AdminDashboard';

import EmployeeEditForm from './components/finance/EmployeeEditForm';

import EmployeeList from './components/finance/EmployeeList';
import Dashboard from './pages/Employee/Dashboard';
import EmployeeTimeBook from './components/Employee/EmployeeTimeBook';
import AttendanceSearch from './components/Employee/AttendanceSearch';

import InventoryDashboard from './pages/Inventory/InventoryDashboard'
import Suppliers from './pages/Inventory/Suppliers'
import Das from './pages/Inventory/Das'
import ADDstocks from './pages/Inventory/ADDstocks'
import ManagePromotions from './components/Sales/ManagePromotions'
import PromoCodeList from './components/Sales/PromoCodeList';
import CreateCampaignEmail from './components/Sales/CreateCampaignEmail';
import PlantDetail from './components/PlantDetail/PlantDetail'


const App = () => {
  const location = useLocation();


  // Define paths where header and footer should be hidden
  const noHeaderFooterPaths = ['/cso/time-book','/cso/dashboard','/cso/attendance-search','/finance/dashboard'];


  return (
    <>
      <div className='app'>
        {/* Conditionally render Navbar */}
        {!noHeaderFooterPaths.includes(location.pathname) && <Navbar />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/finance/dashboard' element={<FinanceDashboard />} />
          <Route path='/finance/add-employee' element={<EmployeeAddForm />} />
          <Route path='/finance/salary-dashboard' element={<SalaryDashboard />} />
          <Route path='/finance/epf-etf-management' element={<EPFETFManagement />} />
          <Route path='/employees/edit/:id' element={<EmployeeEditForm />} />
          <Route path='/employees' element={<EmployeeList />} />
          <Route path='/Step01' element={<Step01 />} />
          <Route path='/Step03' element={<Step03 />} />
          <Route path='/Step04' element={<Step04 />} />
          <Route path='/Aboutus' element={<Aboutus />} />
          <Route path='/cso/dashboard' element={<Dashboard />} />
          <Route path='/cso/time-book' element={<EmployeeTimeBook />} />
          <Route path='/cso/attendance-search' element={<AttendanceSearch />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path='/product'element={<Product />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<Home />} />
          <Route path='/InventoryDashboard' element={<InventoryDashboard/>} />
          <Route path='/Suppliers' element={<Suppliers/>} />
          <Route path='/ADDstocks' element={<ADDstocks/>} />
          <Route path='/Das' element={<Das/>} /> 
            
          <Route path='admin/add/promotions' element={<ManagePromotions />} />
          <Route path='/add/promocode/list' element={<PromoCodeList/>} />
          <Route path='/admin/campaigns/send-email' element={<CreateCampaignEmail />} />
        </Routes>

        {/* Conditionally render Footer */}
        {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
      </div>

    </>
  );
};

export default App;
