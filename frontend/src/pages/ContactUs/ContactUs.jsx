import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import "react-chatbot-kit/build/main.css";
import { useNavigate } from "react-router-dom";

import Chatbot from "../chatbot/Chatbot";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible((prev) => !prev);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors }; // Copy of errors to update
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    switch (name) {
      case "fullName":
        if (!value) {
          newErrors.fullName = "Full name is required";
        } else if (!/^[A-Za-z. ]+$/.test(value)) {
          newErrors.fullName = "Full name must contain only letters.";
        } else {
          delete newErrors.fullName;
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!emailPattern.test(value)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        if (!value) {
          newErrors.phone = "Phone number is required";
        } else if (!phonePattern.test(value)) {
          newErrors.phone = "Phone number must be exactly 10 digits";
        } else {
          delete newErrors.phone;
        }
        break;

      case "message":
        if (!value) {
          newErrors.message = "Message is required";
        } else {
          delete newErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors); // Update errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value); // Validate the field on change
  };

  const validateAllFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, do not proceed with the form submission
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/contact",
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your message has been sent successfully!",
        });

        setFormData({ fullName: "", phone: "", email: "", message: "" });
        setErrors({});
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error sending your message. Please try again.",
      });
    }
  };

  const handleChatbotToggle = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <Container className="my-5">
      {/* Top Right Button */}
      <div className="text-end mb-4">
        <Button
          variant="primary"
          className="bg-green"
          onClick={handleChatbotToggle}
        >
          Talk with Sales Team
        </Button>
      </div>

      {/* Heading */}
      <div className="d-flex justify-content-center align-items-center text-center my-4">
        <h2 className="text-green">
          Don't be a stranger, <br />
          just say hello!
        </h2>
      </div>

      <p className="text-center mt-3">
        Thank you for your interest in our service. Please fill out the form
        below or <br />
        email us at hello@gmail.com
      </p>

      {/* Contact Form and Info */}
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div
          className="dialog-menu border p-4 rounded shadow-lg"
          style={{ maxWidth: "80%", width: "100%" }}
        >
          <Row>
            <Col
              md={4}
              className="text-center border-end d-flex flex-column justify-content-center align-items-center"
            >
              {/* Profile Image */}
              <img
                src="src/assets/customer1.png"
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
              />
              {/* Address, Phone, Gmail */}
              <p className="mb-2">
                <i className="fas fa-map-marker-alt text-green me-2"></i>
                123 Street, City, Country
              </p>
              <p className="mb-2">
                <i className="fas fa-phone-alt text-green me-2"></i>
                +123 456 7890
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope text-green me-2"></i>
                contact@example.com
              </p>
            </Col>
            <Col md={8}>
              {/* Contact Form */}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label style={{ textAlign: "left", display: "block" }}>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-light-gray"
                  />
                  {errors.fullName && (
                    <small className="text-danger" style={{ textAlign: "left", display: "block" }}>{errors.fullName}</small>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label style={{ textAlign: "left", display: "block" }}>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-light-gray"
                  />
                  {errors.phone && (
                    <small className="text-danger" style={{ textAlign: "left", display: "block" }}>{errors.phone}</small>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ textAlign: "left", display: "block" }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-light-gray"
                  />
                  {errors.email && (
                    <small className="text-danger" style={{ textAlign: "left", display: "block" }}>{errors.email}</small>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label style={{ textAlign: "left", display: "block" }}>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-light-gray"
                  />
                  {errors.message && (
                    <small className="text-danger" style={{ textAlign: "left", display: "block" }}>{errors.message}</small>
                  )}
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit" className="bg-green">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>

      <div
        style={{
          position: "fixed", // Fixes the position of the wrapper
          bottom: "20px", // Distance from the bottom
          right: "20px", // Distance from the right
          zIndex: 1000, // Ensures it appears above other content
        }}
      >

        {isChatbotVisible && <Chatbot />}
      </div>
    </Container>
  );
};

// Custom CSS for overriding default colors and styling
const style = document.createElement("style");
style.innerHTML = `
  .bg-green {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
  }
  .text-green {
    color: #28a745 !important;
  }
  .bg-light-gray {
    background-color: #f8f9fa !important;
  }
  p {
    line-height: 1.6;
  }
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 0px;
    max-width: 300px;
    width: 100%;
    z-index: 1000;
  }
`;

document.head.appendChild(style);

export default ContactUs;
