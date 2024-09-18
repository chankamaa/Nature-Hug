import React, { useState, useContext } from "react";
import './order.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';  // Import context

const Order = () => {
    const navigate = useNavigate();
    const { saveOrderData } = useContext(StoreContext);  // Use saveOrderData from context

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});

    const onhandleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Validation logic for required fields and correct email/phone formats
        if (!data.firstName) {
            tempErrors.firstName = "First name is required";
            isValid = false;
        }
        if (!data.lastName) {
            tempErrors.lastName = "Last name is required";
            isValid = false;
        }
        if (!data.email) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            tempErrors.email = "Email address is invalid";
            isValid = false;
        }
        if (!data.street) {
            tempErrors.street = "Street is required";
            isValid = false;
        }
        if (!data.city) {
            tempErrors.city = "City is required";
            isValid = false;
        }
        if (!data.state) {
            tempErrors.state = "State is required";
            isValid = false;
        }
        if (!data.zip) {
            tempErrors.zip = "Zip code is required";
            isValid = false;
        }
        if (!data.country) {
            tempErrors.country = "Country is required";
            isValid = false;
        }
        if (!data.phone) {
            tempErrors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(data.phone)) {
            tempErrors.phone = "Phone number is invalid (must be 10 digits)";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validate()) {
            saveOrderData(data);  // Save the order data to the context and localStorage
            localStorage.setItem("orderData", JSON.stringify(data));  // Save order data in localStorage
            navigate('/Step03');  // Navigate to Step03
        }
    };

    return (
        <form className='place-order'>
            <div className='place-order-left'>
                <br></br><br></br><br></br>
                <p>Step 2/4</p>
                <br></br>
                <p className="title">Delivery Information</p>
                <br></br>

                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="First name"
                        onChange={onhandleChange}
                        name="firstName"
                        value={data.firstName}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                    <input
                        type="text"
                        placeholder="Last name"
                        onChange={onhandleChange}
                        name="lastName"
                        value={data.lastName}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={onhandleChange}
                    name="email"
                    value={data.email}
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                    type="text"
                    placeholder="Street"
                    onChange={onhandleChange}
                    name="street"
                    value={data.street}
                />
                {errors.street && <p className="error">{errors.street}</p>}
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="City"
                        onChange={onhandleChange}
                        name="city"
                        value={data.city}
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                    <input
                        type="text"
                        placeholder="State"
                        onChange={onhandleChange}
                        name="state"
                        value={data.state}
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </div>
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="Zip code"
                        onChange={onhandleChange}
                        name="zip"
                        value={data.zip}
                    />
                    {errors.zip && <p className="error">{errors.zip}</p>}
                    <input
                        type="text"
                        placeholder="Country"
                        onChange={onhandleChange}
                        name="country"
                        value={data.country}
                    />
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>
                <input
                    type="text"
                    placeholder="Phone number"
                    onChange={onhandleChange}
                    name="phone"
                    value={data.phone}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <div className="place-order-button-container">
                <button type="button" onClick={handleSubmit}>Proceed to Payment</button>
            </div>
        </form>
    );
};

export default Order;
