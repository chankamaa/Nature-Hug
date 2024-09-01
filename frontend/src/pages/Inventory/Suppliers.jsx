/* eslint-disable no-unused-vars */
import React from 'react'
import Dashboard from '../../components/Dash/Dashboard'
import './Instocks.css'

const Suppliers = () =>  {
  return (
    <div className="dashbard-container">   
      <Dashboard/>
      <section>

    <form >      
      <div className='type1'>
          <label>Supplier ID:</label>
          <input type="text"id="id"name="id" placeholder='#1234'  required/>
          <label>Supplier Name:</label>
          <input type="text"id="pname"name="pname" placeholder='chankama' required/>
          <label>Description:</label>
          <input type="text"id="qty"name="qty" placeholder='suplier folwers' required/>
          <label >Contact Infor:</label>
          <input type="text"id="amount"name="amount" placeholder='0715468464'required/>
          <label >Product:</label>
          <input type="text"id="total"name="total" placeholder='flowers' required/>
          <button className='button1'> ADD</button>
          <button className='button2'> Remove</button>
          
  
          </div>
          </form>
          </section></div>
  )
}
export default Suppliers