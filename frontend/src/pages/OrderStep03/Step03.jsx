import React from 'react';
import './Step03.css';
import { assets } from '../../assets/assets'

function Step03() {
  return (
    <div className="order-summary-container">
      <br></br>
      <br></br>
      <br></br>
      <h2>Order Summary</h2>
      <p className="text-gray-700 mt-2 step-info">Step 3/4</p>
      <div className="cart-items">
        <div className="cart-item">
          <img src={assets.Cactus} alt="Cactus" />
          <div className="item-details">
            <h4>Cactus and Succulents</h4>
            <div className="quantity-control">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <p className="price">Rs1150</p>
          </div>
        </div>
        <div className="cart-item">
          <img src={assets.Spider} alt="Spider" />
          <div className="item-details">
            <h4>Spider Plant</h4>
            <div className="quantity-control">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <p className="price">Rs1400</p>
          </div>
        </div>
        <div className="cart-item">
          <img src={assets.Jade} alt="Jade" />
          <div className="item-details">
            <h4>Jade Plant</h4>
            <div className="quantity-control">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <p className="price">Rs1175</p>
          </div>
        </div>
      </div>

      <div className="order-totals">
        <p>Subtotal: <span className="subtotal">Rs3725</span></p>
        <p>Delivery fees: <span className="delivery-fees">Rs350</span></p>
        <p>Order Total: <span className="order-total">Rs4075</span></p>
      </div>

      <div className="billing-info">
        <h3>Billing Information</h3>
        <p><strong>Name:</strong> G.S.K Asini Gamage</p>
        <p><strong>Address:</strong> No: 107/B, 1st Lane, Flower Road, Colombo 07, Western Province, Sri Lanka.</p>
        <p><strong>Telephone No:</strong> 0123456888</p>
        <button className="edit-button">Edit</button>
      </div>

      <button className="place-order-button">Place Order</button>
    </div>
  );
}

export default Step03;
