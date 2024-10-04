import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Survey = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favoriteFlowers: "",
    satisfaction: "satisfied",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey submitted:", formData);
    // Logic to handle form submission (e.g., sending data to an API)
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "600px",
        backgroundColor: "#f8f9fa",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        className="text-center mb-4"
        style={{ color: "#28a745", fontWeight: "bold", fontSize: "2rem" }}
      >
        Flower Feedback Survey
      </h1>
      <div className="card shadow-lg" style={{ border: "none" }}>
        <div
          className="card-body"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "25px",
          }}
        >
          <h5
            className="card-title text-center"
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            We value your opinion!
          </h5>
          <p
            className="card-text text-center"
            style={{
              fontSize: "1rem",
              color: "#6c757d",
              marginBottom: "20px",
            }}
          >
            Please take a moment to fill out our survey and help us improve your
            flower shopping experience.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label"
                style={{ fontWeight: "500" }}
              >
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                style={{ padding: "10px", borderRadius: "6px" }}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
                style={{ fontWeight: "500" }}
              >
                Your Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={{ padding: "10px", borderRadius: "6px" }}
                required
              />
            </div>

            {/* Favorite Flowers */}
            <div className="mb-3">
              <label
                htmlFor="favoriteFlowers"
                className="form-label"
                style={{ fontWeight: "500" }}
              >
                Favorite Flowers
              </label>
              <input
                type="text"
                className="form-control"
                id="favoriteFlowers"
                name="favoriteFlowers"
                value={formData.favoriteFlowers}
                onChange={handleChange}
                placeholder="e.g., Roses, Tulips"
                style={{ padding: "10px", borderRadius: "6px" }}
              />
            </div>

            {/* Satisfaction */}
            <div className="mb-3">
              <label
                htmlFor="satisfaction"
                className="form-label"
                style={{ fontWeight: "500" }}
              >
                How satisfied are you with our service?
              </label>
              <select
                className="form-select"
                id="satisfaction"
                name="satisfaction"
                value={formData.satisfaction}
                onChange={handleChange}
                style={{ padding: "10px", borderRadius: "6px" }}
                required
              >
                <option value="satisfied">Satisfied</option>
                <option value="neutral">Neutral</option>
                <option value="dissatisfied">Dissatisfied</option>
              </select>
            </div>

            {/* Comments */}
            <div className="mb-3">
              <label
                htmlFor="comments"
                className="form-label"
                style={{ fontWeight: "500" }}
              >
                Additional Comments
              </label>
              <textarea
                className="form-control"
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="3"
                placeholder="Any other feedback..."
                style={{ padding: "10px", borderRadius: "6px" }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              style={{
                padding: "12px",
                fontSize: "1.2rem",
                borderRadius: "6px",
                backgroundColor: "#28a745",
                border: "none",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
            >
              Submit Survey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Survey;
