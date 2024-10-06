import React, { useState, useEffect, useContext } from 'react';
import './Step04.css'; // Ensure this contains the relevant styles for the PDF
import { assets } from '../../assets/assets'; // Assuming you have assets imported correctly
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import jsPDF from 'jspdf';  // Import jsPDF
import html2canvas from 'html2canvas';  // Import html2canvas for taking screenshots of DOM elements
import { StoreContext } from '../../context/StoreContext';  // Import StoreContext to access cart and order data
import emailjs from 'emailjs-com'; // Import EmailJS

const Step04 = () => {
    const navigate = useNavigate();  // Initialize the navigate function

    // Define state variables to hold the order and cart data
    const [orderData, setOrderData] = useState({});
    const [cartItems, setCartItems] = useState({});
    const { clearCart } = useContext(StoreContext);
    
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
        clearCart();  // Clear the cart after placing the order
        navigate('/product');  // Replace '/products' with the actual route to your product page
    };

    // Function to generate PDF report with header
    const generateReport = () => {
        const input = document.getElementById('report-content');
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Add header with logo, company details, and date
        const imgLogo = assets.logo; // Assuming logo is stored in assets
        const headerText = `Nature Hug\nAddress: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara\nEmail: handamama.pvt@gmail.com | Phone: +94 76 258 2337\n`;
        const currentDate = new Date().toLocaleDateString(); // Get current date

        // Load logo
        doc.addImage(imgLogo, 'PNG', 10, 10, 30, 30); // Logo position (x, y) and size (width, height)
        
        // Add company details
        doc.setFontSize(12);
        doc.text(headerText, 50, 20); // Adjust position of text
        
        // Add date
        doc.text(`Date: ${currentDate}`, 150, 10); // Date position

        // Add report content
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 50; // Start after header

            // Add the report image
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Save the PDF
            doc.save("Order_Report.pdf");
        });
    };

    // Function to send email
    const sendEmail = () => {
        const emailParams = {
            to_name: orderData.firstName + " " + orderData.lastName,
            to_email: orderData.email,
            order_number: `#${Math.floor(Math.random() * 10000000000000)}`,
            order_items: Object.keys(cartItems).map(itemId => {
                const item = cartItems[itemId];
                return `${item.name} x ${item.quantity} (Rs. ${item.price * item.quantity})`;
            }).join(", "),
            delivery_address: `${orderData.street}, ${orderData.city}, ${orderData.state}, ${orderData.zip}, ${orderData.country}`,
            delivery_date: "Tue, Oct 20"
        };

        emailjs.send('your_service_id', 'your_template_id', emailParams, 'your_user_id')
            .then((result) => {
                console.log("Email sent successfully!", result.text);
            }, (error) => {
                console.error("Email sending failed:", error.text);
            });
    };

    useEffect(() => {
        if (orderData.email) {
            sendEmail(); // Automatically send email when orderData is available
        }
    }, [orderData]);

    return (
        <div className="min-h-screen bg-[#f2f1e7] p-8 flex flex-col justify-between">
            {/* Checkout Header */}
            <header className="mb-8">
                <br></br>
                <br></br>
                <h1 className="text-2xl font-bold text-green-900">Checkout</h1>
                <a className="text-gray-700 mt-2 step-info">Step 4/4</a>
                <p className="text-xl text-gray-800 mt-4">Thank you for your Order</p>
            </header>

            {/* Order Confirmation Details */}
            <section className="order-confirmation bg-green-100 p-8 rounded-lg shadow-lg mb-8" id="report-content">
                <p className="text-gray-700 mb-4">
                    <i>We’ll send you an email with tracking information when your item delivers.</i>
                </p>
                <div className="order-info flex justify-between mb-8">
                    <div>
                        <ul className="text-gray-800">
                            <li>Order Placed</li>
                            <li>Arrives by <strong>Tue, Oct 20</strong></li>
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
                        <p>{orderData.email}</p>
                        <p>{orderData.street}</p>
                        <p>{orderData.city}, {orderData.state}, {orderData.zip}</p>
                        <p>{orderData.country}</p>
                        <p>{orderData.phone}</p>
                    </div>
                </div>

                {/* Order Status */}
                <div className="order-status text-gray-700 flex items-center">
                    <div className="status-dot green-dot"></div>  {/* This dot will be green */}
                    <span className="status-label ml-2">Order Placed</span>
                    <div className="status-dot gray-dot ml-8"></div>
                    <span className="status-label ml-2">Processing</span>
                    <div className="status-dot gray-dot ml-8"></div>
                    <span className="status-label ml-2">Delivered</span>
                </div>

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

            {/* Generate PDF Button */}
            <div className="flex justify-center mt-4">
                <button className="continue-shopping-button" onClick={generateReport}>
                    Download Report as PDF
                </button>
            </div>
        </div>
    );
};

export default Step04;
