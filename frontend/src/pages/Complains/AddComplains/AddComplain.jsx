import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const AddComplaints = () => {
  // State variables to hold form data and validation messages
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [productNameOrService, setProductNameOrService] = useState("");
  const [desiredResolution, setDesiredResolution] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [errors, setErrors] = useState({});
  const status = "In Progress";

  // Function to validate individual fields
  const validateField = (field, value) => {
    let errorMsg = "";

    switch (field) {
      case "nameWithInitials":
        if (!value) {
          errorMsg = "Name with initials is required.";
        } else if (!/^[A-Za-z. ]+$/.test(value)) {
          errorMsg = "Name with initials must contain only letters.";
        }
        break;
      case "phoneNo":
        if (!value) {
          errorMsg = "Phone number is required.";
        } else if (!/^\d+$/.test(value)) {
          errorMsg = "Phone number must contain only digits.";
        }
        break;
      case "dateOfIncident":
        if (!value) {
          errorMsg = "Date of incident is required.";
        }
        break;
      case "complaintDetails":
        if (!value) {
          errorMsg = "Complaint details are required.";
        } else if (!/^[A-Za-z. ]+$/.test(value)) {  // Added space in regex if needed for multiple words
          errorMsg = "Complaint details must contain only letters";
        }
        break;
      case "productNameOrService":
        if (!value) {
          errorMsg = "Product name or service is required.";
        } else if (!/^[A-Za-z. ]+$/.test(value)) {  // Added space in regex if needed for multiple words
          errorMsg = "Product name or service must contain only letters";
        }
        break;
      case "desiredResolution":
        if (!value) {
          errorMsg = "Desired resolution is required.";
        } else if (!/^[A-Za-z. ]+$/.test(value)) {  // Added space in regex if needed for multiple words
          errorMsg = "Desired resolution must contain only letters";
        }
        break;
      default:
        break;
    }
    

    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMsg }));
  };

  // Function to clear form fields
  const clearForm = () => {
    setNameWithInitials("");
    setPhoneNo("");
    setDateOfIncident("");
    setComplaintDetails("");
    setProductNameOrService("");
    setDesiredResolution("");
    setAdditionalComments("");
    setErrors({});
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields before submission
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
  
    // Check for errors
    const fieldsToValidate = [
      "nameWithInitials",
      "phoneNo",
      "dateOfIncident",
      "complaintDetails",
      "productNameOrService",
      "desiredResolution",
    ];
    fieldsToValidate.forEach((field) => validateField(field, formData[field]));
  
    // If there are any errors, don't submit the form
    if (Object.values(errors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        title: "Form Incomplete",
        text: "Please correct the errors before submitting.",
      });
      return;
    }
  
    // Send the data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/CreateComplaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const pdfPath = data.pdfPath; // Get the PDF path from the response
  
        // Trigger the PDF download
        const link = document.createElement("a");
        link.href = pdfPath; // Use the path directly from the backend response
        link.download = pdfPath.split('/').pop(); // Suggest a filename for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        Swal.fire({
          icon: "success",
          title: "Complaint Submitted",
          text: "Your complaint has been submitted successfully! The PDF will download now.",
        });
        clearForm();
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

      </Row>
      <Row className="mb-3">
        <Col>
          <h4 className="mb-2">FORM</h4>
          <p>Please complete this form to file your complaint.</p>
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
              onChange={(e) => {
                setNameWithInitials(e.target.value);
                validateField("nameWithInitials", e.target.value);
              }}
            />
            {errors.nameWithInitials && (
              <small className="text-danger">{errors.nameWithInitials}</small>
            )}
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
              onChange={(e) => {
                setPhoneNo(e.target.value);
                validateField("phoneNo", e.target.value);
              }}
            />
            {errors.phoneNo && (
              <small className="text-danger">{errors.phoneNo}</small>
            )}
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
              onChange={(e) => {
                setDateOfIncident(e.target.value);
                validateField("dateOfIncident", e.target.value);
              }}
            />
            {errors.dateOfIncident && (
              <small className="text-danger">{errors.dateOfIncident}</small>
            )}
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
              onChange={(e) => {
                setComplaintDetails(e.target.value);
                validateField("complaintDetails", e.target.value);
              }}
            />
            {errors.complaintDetails && (
              <small className="text-danger">{errors.complaintDetails}</small>
            )}
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
              onChange={(e) => {
                setProductNameOrService(e.target.value);
                validateField("productNameOrService", e.target.value);
              }}
            />
            {errors.productNameOrService && (
              <small className="text-danger">
                {errors.productNameOrService}
              </small>
            )}
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
              onChange={(e) => {
                setDesiredResolution(e.target.value);
                validateField("desiredResolution", e.target.value);
              }}
            />
            {errors.desiredResolution && (
              <small className="text-danger">{errors.desiredResolution}</small>
            )}
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
