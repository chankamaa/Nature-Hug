import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import './Step03.css';

const Step03 = ({ userId }) => {
    const [cart, setCart] = useState({
        items: [
            {
                product: {
                    _id: '1',
                    name: 'Cactus and Succulents',
                    price: 1150,
                    image: '/images/cactus.jpg'
                },
                quantity: 1
            },
            {
                product: {
                    _id: '2',
                    name: 'Spider Plant',
                    price: 2800,
                    image: '/images/spiderplant.jpg'
                },
                quantity: 2
            },
            {
                product: {
                    _id: '3',
                    name: 'Jade Plant',
                    price: 1175,
                    image: '/images/jadeplant.jpg'
                },
                quantity: 1
            }
        ],
        totalPrice: 5125
    });

    const [isEditing, setIsEditing] = useState(false);
    const [billingInfo, setBillingInfo] = useState({
        fullName: 'G.S.K Asini Gamage',
        address: 'No: 107/B, 1st Lane, Flower Road, Colombo 07',
        city: 'Western Province',
        postalCode: '',
        country: 'Sri Lanka',
        telephone: '0123456888'
    });

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleBillingInfoChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleBillingInfoSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        alert('Billing information updated');
    };

    const handlePlaceOrder = () => {
        alert("Order placed successfully!");
        navigate('/Step04'); // Navigate to Step04 page
    };

    return (
        <div className="order-summary">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Order Summary</h2>
            <p>Step 3/4</p>
            <div className="cart-items">
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {cart.items.map((item) => (
                    <div key={item.product._id} className="cart-item">
                        <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                        <p className="cart-item-name">{item.product.name}</p>
                        <div className="quantity-control">
                            <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                            <input type="text" value={item.quantity} readOnly />
                            <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
                        </div>
                        <p className="cart-item-price">Rs {item.product.price}</p>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <p>Subtotal: <span className="amount">Rs {cart.totalPrice}</span></p>
                <p>Delivery fees: <span className="amount">Rs 350</span></p>
                <p className="total">Order Total: <span className="amount">Rs {cart.totalPrice + 350}</span></p>
            </div>
            <div className="billing-info">
                <h3>Billing Information</h3>
                {!isEditing ? (
                    <>
                        <p><strong>Name:</strong> {billingInfo.fullName}</p>
                        <p><strong>Address:</strong> {billingInfo.address}, {billingInfo.city}, {billingInfo.postalCode}, {billingInfo.country}</p>
                        <p><strong>Telephone No:</strong> {billingInfo.telephone}</p>
                        <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
                    </>
                ) : (
                    <form onSubmit={handleBillingInfoSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={billingInfo.fullName}
                                onChange={handleBillingInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={billingInfo.address}
                                onChange={handleBillingInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={billingInfo.city}
                                onChange={handleBillingInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={billingInfo.postalCode}
                                onChange={handleBillingInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={billingInfo.country}
                                onChange={handleBillingInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">Telephone No</label>
                            <input
                                type="text"
                                id="telephone"
                                name="telephone"
                                value={billingInfo.telephone}
                                onChange={handleBillingInfoChange}
                                required
                            />
                        </div>
                        <button type="submit" className="save-button">Save</button>
                    </form>
                )}
            </div>
            <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
        </div>
    );
};

export default Step03;
