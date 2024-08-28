import React, { useState } from "react";
import './Step02.css'

const Step02 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    country: "",
    zipCode: "",
    telephone: "",
    cardNumber: "",
    securityCode: "",
    expMonth: "",
    expYear: "",
    cardName: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};

    // Basic validation
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.streetAddress) tempErrors.streetAddress = "Address is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.country) tempErrors.country = "Country is required";
    if (!formData.zipCode) tempErrors.zipCode = "Zip Code is required";
    if (!formData.telephone) tempErrors.telephone = "Telephone is required";
    
    // Card information validation
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(formData.cardNumber)) tempErrors.cardNumber = "Invalid card number";

    const securityCodeRegex = /^[0-9]{3,4}$/;
    if (!securityCodeRegex.test(formData.securityCode)) tempErrors.securityCode = "Invalid security code";

    if (!formData.expMonth || !formData.expYear) {
      tempErrors.expDate = "Expiration date is required";
    } else {
      const currentDate = new Date();
      const expDate = new Date(`${formData.expYear}-${formData.expMonth}`);
      if (expDate < currentDate) tempErrors.expDate = "Card has expired";
    }

    if (!formData.cardName) tempErrors.cardName = "Cardholder name is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Billing Address</h3>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
        
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}

        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={formData.streetAddress}
          onChange={handleInputChange}
        />
        {errors.streetAddress && <p>{errors.streetAddress}</p>}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
        />
        {errors.city && <p>{errors.city}</p>}

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
        />
        {errors.country && <p>{errors.country}</p>}

        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleInputChange}
        />
        {errors.zipCode && <p>{errors.zipCode}</p>}

        <input
          type="text"
          name="telephone"
          placeholder="Telephone"
          value={formData.telephone}
          onChange={handleInputChange}
        />
        {errors.telephone && <p>{errors.telephone}</p>}
      </div>

      <div>
        <h3>Billing Information</h3>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleInputChange}
        />
        {errors.cardNumber && <p>{errors.cardNumber}</p>}

        <input
          type="text"
          name="securityCode"
          placeholder="Security Code"
          value={formData.securityCode}
          onChange={handleInputChange}
        />
        {errors.securityCode && <p>{errors.securityCode}</p>}

        <input
          type="text"
          name="expMonth"
          placeholder="Exp Month"
          value={formData.expMonth}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="expYear"
          placeholder="Exp Year"
          value={formData.expYear}
          onChange={handleInputChange}
        />
        {errors.expDate && <p>{errors.expDate}</p>}

        <input
          type="text"
          name="cardName"
          placeholder="Card on Name"
          value={formData.cardName}
          onChange={handleInputChange}
        />
        {errors.cardName && <p>{errors.cardName}</p>}
      </div>

      <button type="submit">Continue</button>
    </form>
  );
};

export default Step02;
