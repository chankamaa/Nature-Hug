import React from "react";
import './order.css';
import { useNavigate } from 'react-router-dom'; // Ensure you import useNavigate if needed

const Order = () => {
    const navigate = useNavigate(); // Initialize navigate if not done earlier

    const getTotal = () => {
        // Replace with your actual logic to calculate total
        return 0; // Example total value
    };

    return (
        <form className='place-order'>
            <div className='place-order-left'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>Step 2/4</p>
                <p className="title">Delivery Information</p>
              
                <div className="multi-fields">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                </div>
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Street" />
                <div className="multi-fields">
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State" />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder="Zip code" />
                    <input type="text" placeholder="Country" />
                </div>
                <input type="text" placeholder="Phone number" />
            </div>
            
            <div className='place-order-right'>
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>Rs {getTotal()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>Rs 350</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Total</p>
                        <p>Rs {getTotal() + 350}</p>
                    </div>
                </div>
                <button onClick={() => navigate('/Step03')}>Proceed to Payment</button>
            </div>
        </form>
    )
}

export default Order;
