import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import "./RewardsCenter.css";

const RewardsCenter = () => {
  const [rewards] = useState([
    {
      id: 1,
      name: "Discount Coupon",
      cost: 100,
      description: "Save more with this exclusive coupon!",
      imageUrl:
        "src/assets/360_F_465127589_BfwtgftgEboy01GSVVQZP5hC9XJGXTO1.jpg",
    },
    {
      id: 2,
      name: "Free Shipping",
      cost: 120,
      description: "Get your items delivered for free!",
      imageUrl:
        "src/assets/free-shipping-shop-now-advertisement-label-vector-23529412.jpg",
    },
    {
      id: 3,
      name: "Gift Card",
      cost: 140,
      description: "Use this gift card at your favorite store!",
      imageUrl: "src/assets/images (4).jpeg",
    },
    {
      id: 4,
      name: "Premium Membership",
      cost: 160,
      description: "Enjoy premium benefits with this membership!",
      imageUrl: "src/assets/member-4.png",
    },
    {
      id: 5,
      name: "Exclusive T-Shirt",
      cost: 180,
      description: "Wear this exclusive T-shirt with pride!",
      imageUrl:
        "https://via.placeholder.com/150/007bff/ffffff?text=Exclusive+T-Shirt",
    },
  ]);

  const [showConfetti, setShowConfetti] = useState(false);

  const handleClaim = (reward) => {
    toast.success(`You have successfully claimed: ${reward.name}`);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000); // Hide confetti after 6 seconds
  };

  // Inline CSS for styling
  const styles = {
    container: {
      margin: "20px",
      padding: "20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    rewardCard: {
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
      transition: "transform 0.2s",
    },
    rewardImage: {
      borderRadius: "8px 8px 0 0",
      width: "100%",
      height: "150px",
      objectFit: "cover",
    },
    rewardBody: {
      padding: "15px",
    },
    rewardTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    rewardText: {
      marginBottom: "10px",
    },
    claimButton: {
      backgroundColor: "green",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "10px 15px",
      cursor: "pointer",
      fontSize: "1rem",
      width: "100%",
      transition: "background-color 0.3s, transform 0.2s",
    },
    pointsText: {
      color: "#28a745",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      {showConfetti && <Confetti />}
      <h2 style={styles.header}>Rewards Shop</h2>
      <h3 style={styles.header}>Available Rewards</h3>
      <TransitionGroup className="row">
        {rewards.map((reward) => (
          <CSSTransition
            key={reward.id}
            timeout={500}
            classNames="reward-transition"
          >
            <div className="col-md-4 mb-4">
              <div
                className="card"
                style={styles.rewardCard}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={reward.imageUrl}
                  alt={reward.name}
                  style={styles.rewardImage}
                />
                <div className="card-body" style={styles.rewardBody}>
                  <h5 className="card-title" style={styles.rewardTitle}>
                    {reward.name}
                  </h5>
                  <p className="card-text" style={styles.rewardText}>
                    {reward.description}
                  </p>
                  <p className="card-text">
                    Cost:{" "}
                    <span style={styles.pointsText}>{reward.cost} points</span>
                  </p>
                  <button
                    style={styles.claimButton}
                    onClick={() => handleClaim(reward)}
                  >
                    Claim Reward
                  </button>
                </div>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RewardsCenter;
