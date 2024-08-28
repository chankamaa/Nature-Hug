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



const App=() =>{
  return (

    <>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Step01" element={<Step01 />} />
        <Route path="/Step03" element={<Step03 />} />
        <Route path="/Step04" element={<Step04 />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/myorders" element={<Myorders />} />
      </Routes>
      
    </div>
    <Footer />
    </>
  )

} 

export default  App
