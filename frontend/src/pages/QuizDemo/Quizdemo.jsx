import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button, Container, Row, Col } from "react-bootstrap";

const Quizdemo = () => {
    
    // Quiz questions
    const questions = [
        {
            question: "What is the best time of day to water your plants?",
            answers: ["Morning", "Afternoon", "Evening", "Midnight"],
            correct: "Morning"
        },
        {
            question: "Which plant is known for purifying air indoors?",
            answers: ["Cactus", "Snake Plant", "Lavender", "Daffodil"],
            correct: "Snake Plant"
        },
        {
            question: "Which of these flowers is typically considered an annual plant?",
            answers: ["Oak", "Tulip", "Marigold", "Rose"],
            correct: "Marigold"
        },
        {
            question: "What is the term for planting different types of plants together to benefit each other?",
            answers: ["Mono-cropping", "Companion Planting", "Intercropping", " Crop Rotation"],
            correct: "Companion Planting"
        },
        {
            question: "Which type of soil is best for most flowering plants?",
            answers: ["Rocky", "Loam", "Clay", "Sandy"],
            correct: "Loam"
        }
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
            alert(`Quiz completed! Your score: ${score + 1}/${questions.length}`);
            // Navigate to results or a different page
            navigate("/results"); // Replace with your route
        }
    };

    return (
        <Container className="my-5">
            {/* Progress and Timer */}
            <Row className="mb-4">
                <Col>
                    <ProgressBar now={(currentQuestion + 1) / questions.length * 100} label={`${currentQuestion + 1}/5`} />
                </Col>
                <Col className="text-right">
                    <h5>Time Left: {timeLeft}s</h5>
                </Col>
            </Row>

            {/* Question Section */}
            <Row className="mb-4">
                <Col>
                    <h3>{questions[currentQuestion].question}</h3>
                </Col>
            </Row>

            {/* Answer Options */}
            <Row>
                {questions[currentQuestion].answers.map((answer, index) => (
                    <Col key={index} md={6} className="mb-3">
                        <Button
                            variant={selectedAnswer === answer ? "primary" : "outline-primary"}
                            onClick={() => handleAnswerClick(answer)}
                            className="w-100"
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
                    >
                        {currentQuestion < questions.length - 1 ? "Next" : "Finish Quiz"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Quizdemo;
