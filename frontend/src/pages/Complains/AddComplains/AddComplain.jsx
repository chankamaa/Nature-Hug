import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const AddComplaints = () => {
  // State variables to hold form data
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [productNameOrService, setProductNameOrService] = useState("");
  const [desiredResolution, setDesiredResolution] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const status = "In Progress";

  // Function to clear form fields
  const clearForm = () => {
    setNameWithInitials("");
    setPhoneNo("");
    setDateOfIncident("");
    setComplaintDetails("");
    setProductNameOrService("");
    setDesiredResolution("");
    setAdditionalComments("");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      nameWithInitials,
      phoneNo,
      dateOfIncident,
      complaintDetails,
      productNameOrService,
      desiredResolution,
      additionalComments,
      status,
    };

    // Send the data to the backend
    try {
      const response = await fetch(
        "http://localhost:5000/api/CreateComplaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Complaint Submitted",
          text: "Your complaint has been submitted successfully!",
        });
        clearForm(); // Clear the form fields
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an issue submitting your complaint. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting your complaint. Please check your network connection and try again.",
      });
    }
  };

  return (
    <Container className="container my-4">
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h2 className="text-primary">NATURE HUG</h2>
        </Col>
        <Col className="text-end">
          <img
            src="/closebuttoniconfreevector-1@2x.png"
            alt="Close"
            className="img-fluid"
            style={{ width: "24px", height: "24px" }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h4 className="mb-2">FORM</h4>
          <p>Please complete this form to file your complaint.</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-center">
          <p>
            [Your Company Email] | [Your Company Number] | [Your Company
            Website]
          </p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="nameWithInitials" className="mb-3">
          <Form.Label column sm={4}>
            01. Name with Initials:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Enter your name with initials"
              value={nameWithInitials}
              onChange={(e) => setNameWithInitials(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="phoneNo" className="mb-3">
          <Form.Label column sm={4}>
            02. Phone No:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="dateOfIncident" className="mb-3">
          <Form.Label column sm={4}>
            03. Date of Incident:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="date"
              value={dateOfIncident}
              onChange={(e) => setDateOfIncident(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="complaintDetails" className="mb-3">
          <Form.Label column sm={4}>
            04. Complaint Details:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter complaint details"
              value={complaintDetails}
              onChange={(e) => setComplaintDetails(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="productNameOrService" className="mb-3">
          <Form.Label column sm={4}>
            05. Product Name or Service:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Enter product name or service"
              value={productNameOrService}
              onChange={(e) => setProductNameOrService(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="desiredResolution" className="mb-3">
          <Form.Label column sm={4}>
            07. Desired Resolution:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter desired resolution"
              value={desiredResolution}
              onChange={(e) => setDesiredResolution(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="additionalComments" className="mb-3">
          <Form.Label column sm={4}>
            08. Additional Comments:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter additional comments"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="primary" type="submit">
              Submit Complaint
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddComplaints;
