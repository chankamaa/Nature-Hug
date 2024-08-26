import React from 'react';
import './Step03.css';

function Step03() {
  return (
    <div className="min-h-screen bg-[#f2f1e7] p-8">
      {/* Order Summary Section */}
      <section className="order-summary">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Order Summary</h2>
        <p className="text-gray-700 mt-2 step-info">Step 3/4</p>
        <div className="order-item mb-4">
          <img src="cactus.png" alt="Cactus and Succulents" className="order-image" />
          <div className="order-details">
            <p className="text-lg">Cactus and Succulents</p>
            <div className="quantity-control">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
          <div className="order-price">Rs1150</div>
        </div>
        <div className="order-item mb-4">
          <img src="spider.png" alt="Spider Plant" className="order-image" />
          <div className="order-details">
            <p className="text-lg">Spider Plant</p>
            <div className="quantity-control">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
          <div className="order-price">Rs1400</div>
        </div>
        <div className="order-item mb-4">
          <img src="jade.png" alt="Jade Plant" className="order-image" />
          <div className="order-details">
            <p className="text-lg">Jade Plant</p>
            <div className="quantity-control">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
          <div className="order-price">Rs1175</div>
        </div>
        
        {/* Order Summary Totals */}
        <div className="order-totals">
          <div className="flex justify-end text-lg">
            <p className="mr-4">Subtotal:</p>
            <p>Rs3725</p>
          </div>
          <div className="flex justify-end text-lg">
            <p className="mr-4">Deliver fees:</p>
            <p>Rs350</p>
          </div>
          <div className="flex justify-end text-xl font-bold">
            <p className="mr-4">Order Total:</p>
            <p>Rs4075</p>
          </div>
        </div>
      </section>

      {/* Billing Information Section */}
      <section className="billing-info mt-8">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Billing Information</h2>
        <div className="billing-details">
          <p><strong>Name:</strong> G.S.K Asini Gamage</p>
          <p><strong>Address:</strong> No: 107/B, 1st Lane, Flower Road, Colombo 07, Western Province, Sri Lanka.</p>
          <p><strong>Tele No:</strong> 0123456888</p>
          <button className="edit-button">Edit</button>
        </div>
      </section>

      {/* Place Order Button */}
      <div className="flex justify-center mt-8">
        <button className="place-order-button">Place Order</button>
      </div>
    </div>
  );
}

export default Step03;
