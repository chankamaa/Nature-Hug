import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import Signup from './pages/Signup/signup'
import Login from './pages/Login/login'
import UserProfile from './pages/ProfilePage/profileView'
import UpdateUser from './pages/UpdateUser/updateuser'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
      
        <Route path="/login" element={<Login />}></Route> 
        <Route path="/signup" element={<Signup />}></Route>  
        <Route path="/user-profile" element={<UserProfile />}></Route> 
        <Route path="/update-user/:id" element={<UpdateUser />}></Route> 
       </Routes>
    </BrowserRouter>
  
  )
}

export default App