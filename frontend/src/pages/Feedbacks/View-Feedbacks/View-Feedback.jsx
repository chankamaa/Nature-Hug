import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import "./View-Feedback.css"; // Import custom CSS

const ViewFeedbacks = () => {

    const navigate = useNavigate();

    const handleAddFeedback = () => {
      navigate("/Add-Feedbacks");
    };

    return (
        <Container className="mt-5" >
            {/* Top Right Button */}
            <div className="d-flex justify-content-end mb-4 mt-4" >
                <Button
                style={{ marginTop: "2rem" }}
                    variant="success"
                    className="add-feedback-btn rounded-pill shadow-lg"
                    onClick={handleAddFeedback}
                >
                    Add Feedback
                </Button>
            </div>

            {/* Heading for View Feedbacks */}
            <div className="text mb-4">
                <h2 className="text-primary-custom">View Feedbacks</h2>
            </div>

            {/* Feedback Cards */}
            <div className="feedback-container p-4 rounded shadow-lg">
                <Row>
                    {/* Feedback Cards */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Col md={4} key={i}>
                            <Card className="feedback-card shadow-sm mb-4">
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-3">
                                        <Image
                                            src="src/assets/icon.ico"
                                            roundedCircle
                                            className="me-3"
                                        />
                                        <div>
                                            <Card.Title className="text-primary-custom mb-0">
                                                Customer {i}
                                            </Card.Title>
                                        </div>
                                    </div>
                                    <Card.Text>
                                        {i === 1
                                            ? `"Excellent service! The team was responsive and very helpful."`
                                            : i === 2
                                            ? `"Great experience overall. The product exceeded my expectations!"`
                                            : `"A seamless experience with great communication."`}
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
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default ViewFeedbacks;
