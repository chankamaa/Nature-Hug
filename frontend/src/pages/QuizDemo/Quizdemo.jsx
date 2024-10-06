import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

const Quizdemo = () => {
  const navigate = useNavigate();
  // Quiz questions
  const questions = [
    {
      question: "What is the best time of day to water your plants?",
      answers: ["Morning", "Afternoon", "Evening", "Midnight"],
      correct: "Morning",
    },
    {
      question: "Which plant is known for purifying air indoors?",
      answers: ["Cactus", "Snake Plant", "Lavender", "Daffodil"],
      correct: "Snake Plant",
    },
    {
      question: "Which of these flowers is typically considered an annual plant?",
      answers: ["Oak", "Tulip", "Marigold", "Rose"],
      correct: "Marigold",
    },
    {
      question:
        "What is the term for planting different types of plants together to benefit each other?",
      answers: ["Mono-cropping", "Companion Planting", "Intercropping", "Crop Rotation"],
      correct: "Companion Planting",
    },
    {
      question: "Which type of soil is best for most flowering plants?",
      answers: ["Rocky", "Loam", "Clay", "Sandy"],
      correct: "Loam",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question
  const [score, setScore] = useState(0);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion(); // Automatically go to the next question
    }
  }, [timeLeft]);

  // Handle answer selection
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1); // Increment score if correct
    }

    setSelectedAnswer(null); // Reset answer selection
    setTimeLeft(30); // Reset timer for the next question

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show SweetAlert with score and navigation button
      Swal.fire({
        title: 'Quiz Completed!',
        text: `Your score: ${score + 1}/${questions.length}`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go to Rewards Shop',
        
        customClass: {
          title: 'font-weight-bold text-primary', // Custom class for title
          text: 'font-weight-normal text-dark', // Custom class for text
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Quiz", { state: { points: (score + 1) * 10 } }); // Pass the points value
        }        
      });
    }
  };

  return (
    <Container
      className="my-5"
      style={{
        maxWidth: "800px",
        backgroundColor: "#f8f9fa",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 1.5s",
      }}
    >
      {/* Progress and Timer */}
      <Row className="mb-4">
        <Col>
          <ProgressBar
            now={(currentQuestion + 1) / questions.length * 100}
            label={`${currentQuestion + 1}/5`}
            style={{
              backgroundColor: "#e3f2fd",
              height: "25px",
              fontWeight: "bold",
              fontSize: "16px",
              animation: "progressAnimation 2s ease-in-out",
            }}
          />
        </Col>
        <Col className="text-right">
          <h5 style={{ color: "#ff5722", fontWeight: "bold" }}>Time Left: {timeLeft}s</h5>
        </Col>
      </Row>

      {/* Question Section */}
      <Row className="mb-4">
        <Col>
          <h3
            style={{
              fontWeight: "bold",
              color: "#3f51b5",
              animation: "fadeInDown 1s",
            }}
          >
            {questions[currentQuestion].question}
          </h3>
        </Col>
      </Row>

      {/* Answer Options */}
      <Row>
        {questions[currentQuestion].answers.map((answer, index) => (
          <Col
            key={index}
            md={6}
            className="mb-3"
            style={{ animation: "fadeInUp 0.8s" }}
          >
            <Button
              variant={selectedAnswer === answer ? "primary" : "outline-primary"}
              onClick={() => handleAnswerClick(answer)}
              className="w-100"
              style={{
                padding: "12px 20px",
                fontSize: "18px",
                borderRadius: "12px",
                transition: "0.3s",
                borderColor: "#3f51b5",
                boxShadow: selectedAnswer === answer ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "",
              }}
            >
              {answer}
            </Button>
          </Col>
        ))}
      </Row>

      {/* Next Button */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button
            variant="success"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            style={{
              fontSize: "20px",
              padding: "12px 40px",
              borderRadius: "20px",
              animation: "pulse 2s infinite",
            }}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Finish Quiz"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Quizdemo;
