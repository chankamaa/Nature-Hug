import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddFeedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productType: "",
    rating: "",
    suggestions: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/CreateFeedback",
        formData
      );
      console.log("Feedback submitted:", response.data);

      // Show success alert
      await Swal.fire({
        title: "Success!",
        text: "Your feedback has been submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/View-Feedbacks");
    } catch (error) {
      console.error("Error submitting feedback:", error);

      // Show error alert
      await Swal.fire({
        title: "Error!",
        text: "There was an error submitting your feedback. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle View Feedbacks function to navigate to View-Feedbacks page
  const handleViewFeedbacks = () => {
    navigate("/View-Feedbacks");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", backgroundColor: "#F5F5DC", borderRadius: "8px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <button className="btn btn-success mt-4" onClick={handleViewFeedbacks}>
          View Feedbacks
        </button>
      </div>

      <h3 className="text-center" style={{ marginBottom: "20px" }}>Quick Feedback Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label style={{ display: "block", marginBottom: "5px" }}>Product Type</label>
          <select
            className="form-control"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
            style={{ padding: "8px", backgroundColor: "#fff" }}
          >
            <option value="">Select Product Type</option>
            <option value="Title/Quote">Title/Quote</option>
            <option value="Plant">Plant</option>
            <option value="Pots">Pots</option>
          </select>
        </div>

        <div className="mb-3">
          <label style={{ display: "block", marginBottom: "5px" }}>Rate Us (1 to 5)</label>
          <div className="d-flex justify-content-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  onChange={handleChange}
                  required
                  style={{ marginRight: "5px" }}
                />
                {num}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label style={{ display: "block", marginBottom: "5px" }}>Suggestions</label>
          <textarea
            className="form-control"
            name="suggestions"
            rows="3"
            value={formData.suggestions}
            onChange={handleChange}
            placeholder="Your suggestions"
            style={{ padding: "8px", backgroundColor: "#fff" }}
          ></textarea>
        </div>

        <div className="mb-3">
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            style={{ padding: "8px", backgroundColor: "#fff" }}
          />
        </div>

        <button type="submit" className="btn btn-success w-100" style={{ padding: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFeedback;
