import React from 'react';
import './Step04.css';

function Step04() {
  return (
    <div className="min-h-screen bg-[#f2f1e7] p-8 flex flex-col justify-between">
      <p className="text-gray-700 mt-2 step-info">Step 4/4</p>
      {/* Checkout Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-green-900">Checkout</h1>
        <p className="text-xl text-gray-800 mt-4">Thank you for your order <span className="font-bold">#3911690705825</span></p>
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
              <li>Arrives by <strong>Tue, Aug 8</strong></li>
              <li>Sold by Nature Hug</li>
              <li>Order <strong>#3911690705825</strong></li>
            </ul>
            <div className="barcode mt-4">
              <img src="barcode.png" alt="Order Barcode" />
            </div>
          </div>
          <div>
            <ul className="text-gray-800">
              <li><strong>G.S.K Asini Gamage</strong></li>
              <li>No: 107/B, 1st Lane, Flower Road,</li>
              <li>Colombo 07, Western Province,</li>
              <li>Sri Lanka, 0123456888</li>
            </ul>
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

      {/* Help Section */}
      <footer className="mb-8 text-gray-800">
        <p>• Need Help? <a href="#" className="underline">Contact Us</a></p>
      </footer>

      {/* Continue Shopping Button */}
      <div className="flex justify-center">
        <button className="continue-shopping-button">Continue Shopping</button>
      </div>
    </div>
  );
}

export default Step04;
