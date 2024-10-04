import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const ViewFeedbacks = () => {

    const navigate = useNavigate();

    const handleAddFeedback = () => {
      navigate("/Add-Feedbacks");
    };


  return (
    <Container className="mt-5">
      {/* Top Right Button */}
      <div className="d-flex justify-content-end mb-4 mt-4">
        <Button
          variant="success"
          className="bg-green border-0 rounded-pill shadow-lg"
          onClick={handleAddFeedback}
        >
          Add Feedback
        </Button>
      </div>

      {/* Heading for View Feedbacks */}
      <div className="text mb-4">

        <h2 className="text-green">View Feedbacks</h2>
      </div>

      {/* Dialog Menu */}
      <div
        className="dialog-menu border p-4 rounded shadow-lg"
        style={{ width: "95%" }}
      >
        <Row>
          {/* Feedback Card 1 */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="src\assets\icon.ico"
                    roundedCircle
                    className="me-3"
                  />
                  <div>
                    <Card.Title className="text-green mb-0">
                      Customer 1
                    </Card.Title>
              
                  </div>
                </div>
                <Card.Text>
                  "Excellent service! The team was responsive and very helpful."
                </Card.Text>
                <div className="text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Feedback Card 2 */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="src\assets\icon.ico"
                    roundedCircle
                    className="me-3"
                  />
                  <div>
                    <Card.Title className="text-green mb-0">
                      Customer 2
                    </Card.Title>
                  </div>
                </div>
                <Card.Text>
                  "Great experience overall. The product exceeded my
                  expectations!"
                </Card.Text>
                <div className="text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Feedback Card 3 */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="src\assets\icon.ico"
                    roundedCircle
                    className="me-3"
                  />
                  <div>
                    <Card.Title className="text-green mb-0">
                      Customer 3
                    </Card.Title>
       
                  </div>
                </div>
                <Card.Text>
                  "Very satisfied with the support. Quick and effective
                  solutions."
                </Card.Text>
                <div className="text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* Feedback Card 4 */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="src\assets\icon.ico"
                    roundedCircle
                    className="me-3"
                  />
                  <div>
                    <Card.Title className="text-green mb-0">
                      Customer 4
                    </Card.Title>
              
                  </div>
                </div>
                <Card.Text>
                  "The team delivered outstanding results on time."
                </Card.Text>
                <div className="text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Feedback Card 5 */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="src\assets\icon.ico"
                    roundedCircle
                    className="me-3"
                  />
                  <div>
                    <Card.Title className="text-green mb-0">
                      Customer 5
                    </Card.Title>
       
                  </div>
                </div>
                <Card.Text>
                  "A seamless experience with great communication."
                </Card.Text>
                <div className="text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Feedback Card 6 */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="src\assets\icon.ico"
                    roundedCircle
                    className="me-3"
                  />
                  <div>
                    <Card.Title className="text-green mb-0">
                      Customer 6
                    </Card.Title>
             
                  </div>
                </div>
                <Card.Text>
                  "I'm extremely happy with the final product."
                </Card.Text>
                <div className="text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
              </Card.Body>
            </Card>
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
    background-color: #DADADB !important;
  }
  p {
    line-height: 1.6;
  }
`;
document.head.appendChild(style);

export default ViewFeedbacks;
