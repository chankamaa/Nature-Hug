import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './step03.css';  // Import your CSS styles

const Step03 = () => {
    const navigate = useNavigate();

    // Load order and cart data from localStorage
    const [orderData, setOrderData] = useState(() => {
        const storedOrderData = localStorage.getItem('orderData');
        return storedOrderData ? JSON.parse(storedOrderData) : {};
    });

    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : {};
    });

    const [deliveryFee] = useState(350);
    const [subtotal, setSubtotal] = useState(0);
    const [fullTotal, setFullTotal] = useState(0);

    // Calculate subtotal and full total
    useEffect(() => {
        let tempSubtotal = 0;
        Object.keys(cartItems).forEach((itemId) => {
            const item = cartItems[itemId];
            tempSubtotal += item.price * item.quantity;
        });
        setSubtotal(tempSubtotal);
        setFullTotal(tempSubtotal + deliveryFee);
    }, [cartItems, deliveryFee]);

    const handleProceedToPayment = () => {
        // Proceed to the next step (payment)
        navigate('/Step04');
    };

    return (
        <div className='order-summary'>
            <br></br><br></br><br></br>
            <h2>Order Summary</h2>
            <div className='order-items'>
                <div className='order-items-list'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div>
                <hr />
                {Object.keys(cartItems).map((itemId) => {
                    const item = cartItems[itemId];
                    return (
                        <div key={itemId} className='order-item'>
                            <img src={item.image} alt={item.name} className='order-item-image' />
                            <p>{item.name}</p>
                            <p>Rs. {item.price}</p>
                            <p>{item.quantity}</p>
                            <p>Rs. {item.price * item.quantity}</p>
                        </div>
                    );
                })}
                <hr />
                <div className='order-total'>
                    <h3>Subtotal: Rs. {subtotal}</h3>
                    <h3>Delivery Fee: Rs. {deliveryFee}</h3>
                    <h3>Total: Rs. {fullTotal}</h3>
                </div>
                <div className='proceed-payment'>
                    <button onClick={handleProceedToPayment}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Step03;
