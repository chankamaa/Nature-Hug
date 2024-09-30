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
        let value = event.target.value;

        // Name fields should only accept alphabetic characters
        if ((name === "firstName" || name === "lastName") && value) {
            value = value.replace(/[^a-zA-Z]/g, '');
        }

        // Phone number should only accept numeric values
        if (name === "phone" && value) {
            value = value.replace(/[^0-9]/g, '');
        }

        setData({ ...data, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Name validation (must contain only letters and not be empty)
        if (!data.firstName) {
            tempErrors.firstName = "First name is required";
            isValid = false;
        }

        if (!data.lastName) {
            tempErrors.lastName = "Last name is required";
            isValid = false;
        }

        // Phone validation (must contain only digits and be between 9 and 15 characters)
        if (!data.phone.match(/^[0-9]{9,15}$/)) {
            tempErrors.phone = "Phone number is required and must be between 9 and 15 digits";
            isValid = false;
        }

        // Email validation (basic email format validation)
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            tempErrors.email = "A valid email is required";
            isValid = false;
        }

        // Required field validation
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

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validate()) {
            // Save the order data to the context and localStorage
            saveOrderData(data);
            localStorage.setItem("orderData", JSON.stringify(data));  // Save order data in localStorage
            navigate('/Step04');  // Navigate to Step04
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
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                    <input
                        type="text"
                        placeholder="Last name"
                        onChange={onhandleChange}
                        name="lastName"
                        value={data.lastName}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={onhandleChange}
                    name="email"
                    value={data.email}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                    type="text"
                    placeholder="Street"
                    onChange={onhandleChange}
                    name="street"
                    value={data.street}
                />
                {errors.street && <span className="error">{errors.street}</span>}
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="City"
                        onChange={onhandleChange}
                        name="city"
                        value={data.city}
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                    <input
                        type="text"
                        placeholder="State"
                        onChange={onhandleChange}
                        name="state"
                        value={data.state}
                    />
                    {errors.state && <span className="error">{errors.state}</span>}
                </div>
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="Zip code"
                        onChange={onhandleChange}
                        name="zip"
                        value={data.zip}
                    />
                    {errors.zip && <span className="error">{errors.zip}</span>}
                    <input
                        type="text"
                        placeholder="Country"
                        onChange={onhandleChange}
                        name="country"
                        value={data.country}
                    />
                    {errors.country && <span className="error">{errors.country}</span>}
                </div>
                <input
                    type="text"
                    placeholder="Phone number"
                    onChange={onhandleChange}
                    name="phone"
                    value={data.phone}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="place-order-button-container">
                <button type="button" onClick={handleSubmit}>Proceed to Payment</button>
            </div>
        </form>
    );
};

export default Order;
