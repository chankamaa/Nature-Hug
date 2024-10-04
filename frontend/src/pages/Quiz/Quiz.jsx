import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const styles = {
  earningWidgetContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "50px",
    alignItems: "center", // Center the content horizontally
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
  },
  pointsDisplay: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ff9800",
  },
  widgetRight: {
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // Center the content horizontally
  },
  eventCards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center", // Center the cards horizontally
  },
  card: {
    backgroundColor: "#2c2c2c",
    color: "white",
    padding: "20px",
    width: "250px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  cardButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#4caf50",
    border: "none",
    color: "white",
    cursor: "pointer",
    width: "160px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  cardButtonHover: {
    backgroundColor: "#45a049",
  },
  rewardButton: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#ff9800",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1.2rem",
    transition: "background-color 0.3s",
  },
  rewardButtonHover: {
    backgroundColor: "#fb8c00",
  },
};

const Quiz = () => {
  const navigate = useNavigate();
  
  // State to track the user's Glow Points
  const [points, setPoints] = useState(10); // Starting with 10 points by default

  // Functions to handle points updates for each activity
  const handleRewards = () => {
    navigate("/Reward");
  };

  const handleQuizDemo = () => {
    setPoints(points + 50); // Adds 50 Glow Points for the quiz
    navigate("/QuizDemo");
  };

  const handleSurvey = () => {
    setPoints(points + 100); // Adds 100 Glow Points for completing a survey
    navigate("/Survays");
  };

  const handleAddPoints = (addedPoints) => {
    setPoints(points + addedPoints); // General function to add points
  };

  return (
    <div style={styles.earningWidgetContainer}>
      {/* Display available Glow Points */}
      <div style={styles.pointsDisplay}>Available Glow Points: {points}</div>

      <div style={styles.header}>
        <h1>Earn Glow Points Easily!</h1>
        <p style={styles.description}>
          Collect Glow Points by completing various activities. Use these points
          to unlock exciting rewards and offers! Here’s how you can start earning:
        </p>
      </div>
      <div style={styles.widgetRight}>
        <div style={styles.eventCards}>
          <div style={styles.card}>
            <h5>Make a Purchase</h5>
            <p>1 Glow Point for Each $1</p>
            <button
              style={styles.cardButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButton.backgroundColor)
              }
              onClick={() => handleAddPoints(1)} // Add 1 point for each purchase
            >
              Shop 'Til You Drop
            </button>
          </div>
          <div style={styles.card}>
            <h5>Follow us on TikTok</h5>
            <p>25 Glow Points</p>
            <button
              style={styles.cardButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButton.backgroundColor)
              }
              onClick={() => handleAddPoints(25)} // Add 25 points for TikTok follow
            >
              Follow Us!
            </button>
          </div>
          <div style={styles.card}>
            <h5>Follow us on Instagram</h5>
            <p>25 Glow Points</p>
            <button
              style={styles.cardButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButton.backgroundColor)
              }
              onClick={() => handleAddPoints(25)} // Add 25 points for Instagram follow
            >
              Please Follow Us!
            </button>
          </div>
          <div style={styles.card}>
            <h5>Complete a Survey</h5>
            <p>100 Glow Points</p>
            <button
              style={styles.cardButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButton.backgroundColor)
              }
              onClick={handleSurvey}
            >
              Gimme Feedback!
            </button>
          </div>
          <div style={styles.card}>
            <h5>Take Quiz</h5>
            <p>50 Glow Points</p>
            <button
              style={styles.cardButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButton.backgroundColor)
              }
              onClick={handleQuizDemo}
            >
              Quiz Time!
            </button>
          </div>
          <div style={styles.card}>
            <h5>Recycle Candle Holder</h5>
            <p>10 Glow Points</p>
            <button
              style={styles.cardButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.cardButton.backgroundColor)
              }
              onClick={() => handleAddPoints(10)} // Add 10 points for recycling
            >
              I Love Recycling
            </button>
          </div>
        </div>
      </div>
      <button
        style={styles.rewardButton}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = styles.rewardButtonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = styles.rewardButton.backgroundColor)
        }
        onClick={handleRewards}
      >
        Go to Reward Shop
      </button>
    </div>
  );
};

export default Quiz;
