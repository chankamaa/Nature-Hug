import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const Complain = () => {

    const navigate = useNavigate();

    const handleAddComplains = () => {
      navigate("/AddComplains");
    };

    const handleViewComplains = () => {
        navigate("/ViewComplains");
      };

  return (
    <Container className="mt-5">
      {/* Dialog Menu */}
      <div
        className="dialog-menu border p-4 rounded shadow-lg mx-auto"
        style={{ width: "80%" }}
      >
        {/* Heading */}
        <h2 className="text-center mb-4 text-green">Customer Complaints</h2>

        {/* Paragraph */}
        <p className="text-center lead mb-5">
          If you have any issues or concerns regarding our services, please feel
          free to share your complaints here. We value your feedback and aim to
          address all concerns promptly.
        </p>

        {/* Content Row */}
        <Row>
          {/* Left-hand Side - Details */}
          <Col md={6} className="d-flex align-items-center">
            <div>
              <p>
                Please ensure that you provide us with detailed information
                about your complaint so that we can resolve the issue
                efficiently. Your feedback helps us improve our services and
                better serve you in the future.
              </p>
            </div>
          </Col>

          {/* Right-hand Side - Image */}
          <Col md={6} className="text-center">
            <Image
              src="src/assets/complain.png"
              fluid
              className="rounded"
              alt="Customer Complaints"
            />
          </Col>
        </Row>

        {/* Buttons Row */}
        <Row className="mt-5">
          <Col className="d-flex justify-content-around">
            <Button
              variant="success"
              className="bg-green border-0 rounded-pill shadow-lg"
              onClick={handleAddComplains}
            >
              Add Complaint
            </Button>
            <Button
              variant="primary"
              className="border-0 rounded-pill shadow-lg"
              onClick={handleViewComplains}
            >
              View Complaints
            </Button>
          </Col>
        </Row>
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
  .text-warning {
    color: #ffc107 !important;
  }
  .bg-light-gray {
    background-color: #f8f9fa !important;
  }
  p {
    line-height: 1.6;
  }
`;
document.head.appendChild(style);

export default Complain;
