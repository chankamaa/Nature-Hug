


/* eslint-disable no-unused-vars */
import React from 'react'
import Dashboard from '../../components/Dash/Dashboard'

import { useState } from 'react'
import './Instocks.css'

function ADDstocks  ()  {

    const[price,setPrice] = useState(0);
    const[qty,setQty] = useState(0);
     const[total,setTotal] = useState(0);

    const[users,setusers] = useState([]);
   const[name,setName] = useState();

    const [sum,setSum] = useState();
    

    function calculation() {

       
        users.push({name,qty,price,sum});
        
        const total = users.reduce((total,user)=>{

    total += Number(user.sum)
    return total

        },0);

        setTotal(total)
        
        setName('');
        setQty('');
        setPrice('');
        setSum('');
    }
    const handlePriceChange = (e) =>{

        const newPrice = parseFloat(e.target.value);
        if (!isNaN(newPrice)){

            setPrice(newPrice)
          
            calculateTotal(newPrice,qty);
            
        }
    }
      
const handleQuantityChange = (e) => {

const newQuantity = parseInt (e.target.value);
if(!isNaN(newQuantity)) {

setQty(newQuantity);

calculateTotal(price,newQuantity);

}

    };

    const calculateTotal =(price,qty) =>{
        const newTotal = price * qty;
        setSum(newTotal);


    };

    





    return(

      <div className="dashbard-container">
          <Dashboard/>

          <main className="main-contet">
          <section>

<form >      
  <div className='type1'>
      <label>Product ID:</label>
      <input type="text"id="id"name="id" placeholder='#1234' />

      <label>Product Name:</label>
      <input type="text"placeholder='Flower' value={name} onChange={(event) =>{setName(event.target.value);}}/>

      <label>Price:</label>
      <input type="text"placeholder='1000.00'value={price} onChange={handlePriceChange} />

      <label >qty:</label>
      <input type="text"  placeholder='99' value={qty} onChange={handleQuantityChange}  />
      
      <label >Total Amount:</label>
      <input type="text"id="total"name="total" placeholder='10000.00' value={sum} disabled />

      <button className='button1' type='submit' onClick={calculation}> ADD</button>
      <button className='button2'> Remove</button>
      
      </div>
      </form>
      </section>
      
      <div style={{ padding: '20px', backgroundColor: '#f5f5dc' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                  <tr>
                      <th >Product Id</th>
                      <th >Product Name</th>
                      <th >Price</th>
                      <th >Qty</th>
                      <th >Total Amount</th>
                      <th >Action</th>
                  </tr>
              </thead>

              <tbody> 
                  {users.map((row,index) =>(
                      <tr key={index}>
                      <td >{row.name}</td>
                      <td >{row.price}</td>
                      <td >{row.qty}</td>
                      <td >{row.sum}</td>
                  </tr>) )}
                

                 
              </tbody>
          </table>

      </div>

            </main>

        </div>

    ) 
  
  
  }
    
  
  export default ADDstocks
  