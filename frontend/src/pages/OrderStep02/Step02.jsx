import React from 'react';
import './Step02.css';

function Step02() {
  return (
    <div className="min-h-screen bg-[#fdf7e6] flex flex-col justify-between px-8 py-16">
      {/* Billing Address Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Billing Address</h2>
        <p className="text-gray-700 mt-2 step-info">Step 2/4</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="streetAddress" className="block text-gray-700">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block text-gray-700">City</label>
            <input
              type="text"
              id="city"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="zipCode" className="block text-gray-700">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-gray-700">Telephone</label>
            <input
              type="text"
              id="telephone"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Billing Information Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Billing Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="securityCode" className="block text-gray-700">Security Code</label>
            <input
              type="text"
              id="securityCode"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="expMonth" className="block text-gray-700">Exp Month</label>
            <input
              type="text"
              id="expMonth"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="expYear" className="block text-gray-700">Exp Year</label>
            <input
              type="text"
              id="expYear"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-gray-700">Card on Name</label>
          <input
            type="text"
            id="cardName"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </section>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button className="bg-green-700 text-white py-2 px-6 rounded-lg">
          Continue
        </button>
      </div>
    </div>
  );
}

export default Step02;
