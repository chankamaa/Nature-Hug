import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Step01.css';

const Step01 = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    let tempErrors = {};

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      // Form is valid, proceed with submission
      console.log("Email submitted:", email);
      // Navigate to the order page
      navigate("/order");
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <br></br><br></br>
      <p>Step 1/4</p>
      <br></br>
      <br></br>
      <h3>Email Address</h3>
      <br></br>
      <p>Returning Customer?</p>
      <a>Sign into your account to keep your orders in one place.</a>
      <br></br>
      <br></br><br></br><br></br>
      <input
        type="text"
        name="email"
        placeholder="Email Address"
        value={email}
        onChange={handleInputChange}
        className="email-input"
      />
      <br></br>
      {errors.email && <p className="error-message">{errors.email}</p>}
      <br></br>
      
      <button type="submit" className="submit-button">Continue</button>
      <br></br><br></br><br></br><br></br>
    </form>
  );
};

export default Step01;
