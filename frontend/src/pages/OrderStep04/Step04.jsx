import React, { useState, useEffect } from 'react';
import './Step04.css';
import { assets } from '../../assets/assets'; // Assuming you have assets imported correctly
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Step04 = () => {
    const navigate = useNavigate();  // Initialize the navigate function

    // Define state variables to hold the order and cart data
    const [orderData, setOrderData] = useState({});
    const [cartItems, setCartItems] = useState({});
    
    useEffect(() => {
        // Retrieve orderData from localStorage
        const storedOrderData = localStorage.getItem('orderData');
        if (storedOrderData) {
            setOrderData(JSON.parse(storedOrderData));
        }

        // Retrieve cartItems from localStorage
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // Handle navigation to the product page
    const handleContinueShopping = () => {
        navigate('/product');  // Replace '/products' with the actual route to your product page
    };

    return (
        <div className="min-h-screen bg-[#f2f1e7] p-8 flex flex-col justify-between">
            {/* Checkout Header */}
            <header className="mb-8">
                <br></br>
                <br></br>
                <h1 className="text-2xl font-bold text-green-900">Checkout</h1>
                <a className="text-gray-700 mt-2 step-info">Step 4/4</a>
                <p className="text-xl text-gray-800 mt-4">Thank you for your order, <span className="font-bold">#{Math.floor(Math.random() * 10000000000000)}</span></p>
            </header>

            {/* Order Confirmation Details */}
            <section className="order-confirmation bg-green-100 p-8 rounded-lg shadow-lg mb-8">
                <p className="text-gray-700 mb-4">
                    <i>We’ll send you an email with tracking information when your item delivers.</i>
                </p>
                <div className="order-info flex justify-between mb-8">
                    <div>
                        <ul className="text-gray-800">
                            <li>Order Placed</li>
                            <li>Arrives by <strong>Tue, Sep 20</strong></li>
                            <li>Sold by Nature Hug</li>
                            <li>Order <strong>#{Math.floor(Math.random() * 10000000000000)}</strong></li>
                        </ul>
                        <div className="barcode mt-4">
                            <img src={assets.QRcode} alt="QRcode" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold">Delivery To:</h3>
                        <p>{orderData.firstName} {orderData.lastName}</p>
                        <p>{orderData.street}</p>
                        <p>{orderData.city}, {orderData.state}, {orderData.zip}</p>
                        <p>{orderData.country}</p>
                        <p>{orderData.phone}</p>
                    </div>
                </div>

                {/* Order Status */}
                <div className="order-status text-gray-700 flex items-center">
                    <div className="status-dot bg-green-700"></div>
                    <span className="status-label ml-2">Order Placed</span>
                    <div className="status-dot bg-gray-300 ml-8"></div>
                    <span className="status-label ml-2">Processing</span>
                    <div className="status-dot bg-gray-300 ml-8"></div>
                    <span className="status-label ml-2">Delivered</span>
                </div>
            </section>

            {/* Cart Items Summary */}
            <section className="cart-items-summary bg-green-100 p-8 rounded-lg shadow-lg mb-8">
                <h3 className="font-bold mb-4">Items Ordered</h3>
                {Object.keys(cartItems).map((itemId) => {
                    const item = cartItems[itemId];
                    return (
                        <div key={itemId} className="cart-item">
                            <p>{item.name} x {item.quantity}</p>
                            <p>Rs. {item.price * item.quantity}</p>
                        </div>
                    );
                })}
            </section>

            {/* Help Section */}
            <footer className="mb-8 text-gray-800">
                <p>• Need Help? <a href="#" className="underline">Contact Us</a></p>
            </footer>

            {/* Continue Shopping Button */}
            <div className="flex justify-center">
                <button className="continue-shopping-button" onClick={handleContinueShopping}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default Step04;
