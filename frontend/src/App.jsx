import React from 'react'
import {Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer'
import FinanceDashboard from './pages/FinanceDashboard';
import EmployeeAddForm from './components/finance/EmployeeAddForm';
import SalaryDashboard from './components/finance/SalaryDashboard';
import EPFETFManagement from './components/finance/EPFETFManagement';
import EmployeeEditForm from './components/finance/EmployeeEditForm';
import EmployeeList from './components/finance/EmployeeList';
import Step01 from './pages/OrderStep01/Step01';
import Step03 from './pages/OrderStep03/Step03';
import Step04 from './pages/OrderStep04/Step04';
import Aboutus from './pages/AboutUs/Aboutus';
import Dashboard from './pages/Employee/Dashboard';
import EmployeeTimeBook from './components/Employee/EmployeeTimeBook';
import AttendanceSearch from './components/Employee/AttendanceSearch';
// import Myorders from './pages/Myorders/Myorders';
// import Product from './pages/Product/product';

import ViewFeedbacks from './pages/Feedbacks/View-Feedbacks/View-Feedback';
import Complain from './pages/Complains/Complain';
import AddFeedback from './pages/Feedbacks/Add-Feedbacks/Add-Feedback';
import AddComplains from './pages/Complains/AddComplains/AddComplain';
import ViewComplains from './pages/Complains/ViewComplains/ViewComplains';
import RewardsCenter from './components/Rewards/RewardsCenter';
import Quiz from './pages/Quiz/Quiz';
import Quizdemo from './pages/QuizDemo/Quizdemo';
import Survey from './pages/Survays/Survays';
import ContactUs from './pages/ContactUs/ContactUs';


const App = () => {

  const location = useLocation();

  // Define paths where header and footer should be hidden
  const noHeaderFooterPaths = ['/cso/time-book','/cso/dashboard','/cso/attendance-search'];

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

        {/* { <Route path="/myorders" element={<Myorders />} />}
        {<Route path='/product'element={<Product />} /> } */}

        
        <Route path="/ContactUs" element={<ContactUs />} />

        <Route path="/View-Feedbacks" element={<ViewFeedbacks />} />
        <Route path="/Add-Feedbacks" element={<AddFeedback />} />
        
        <Route path="/Complains" element={<Complain />} />
        <Route path="/AddComplains" element={<AddComplains />} />
        <Route path="/ViewComplains" element={<ViewComplains />} />

        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Reward" element={<RewardsCenter />} />

        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/QuizDemo" element={<Quizdemo />} />

        <Route path="/Survays" element={<Survey />} />
        </Routes>
      </div>  
      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;