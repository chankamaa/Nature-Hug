import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AddFeedback = () => {
  const navigate = useNavigate();

  const handleViewFeedbacks = () => {
    navigate("/View-Feedbacks");
  };

  const handleViewComplains = () => {
    navigate("/ViewComplains");
  };

  return (
    <div>
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div></div>
          <button 
            className="btn btn-success mt-4"
            onClick={handleViewFeedbacks}
          >
            View Feedbacks
          </button>
        </div>
        <section>
          <div 
            className="card shadow-sm p-4" 
            style={{ backgroundColor: "#F5F5DC" }}  // Set background color here
          >
            <div className="text-center mb-4">
              <img
                src="src\assets\1.jpg"
                alt="Product"
                className="img-fluid mb-3 rounded"
                style={{ maxWidth: "200px" }}
              />
              <h1 className="h4">Product Feedback Form</h1>
              <p className="text-muted">
                Thank you for taking the time to provide feedback. We appreciate
                hearing from you and will review your comments carefully.
              </p>
            </div>
            <form>
              <div className="mb-4">
                <label className="form-label">Select One</label>
                <select className="form-select"
                     style={{ backgroundColor: "#F5F5DC" }} >
                  <option>Title/Quote</option>
                  <option>Plant</option>
                  <option>Pots</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">
                  How satisfied are you with our company overall?
                </label>
                <div className="d-flex justify-content-center">
                  <div className="btn-group" role="group" aria-label="Rating">
                    <input type="radio" className="btn-check" name="rating" id="rate1" />
                    <label className="btn btn-outline-primary" htmlFor="rate1">1</label>

                    <input type="radio" className="btn-check" name="rating" id="rate2" />
                    <label className="btn btn-outline-primary" htmlFor="rate2">2</label>

                    <input type="radio" className="btn-check" name="rating" id="rate3" />
                    <label className="btn btn-outline-primary" htmlFor="rate3">3</label>

                    <input type="radio" className="btn-check" name="rating" id="rate4" />
                    <label className="btn btn-outline-primary" htmlFor="rate4">4</label>

                    <input type="radio" className="btn-check" name="rating" id="rate5" />
                    <label className="btn btn-outline-primary" htmlFor="rate5">5</label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Do you have any suggestions to improve our product and
                  service?
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Your suggestions"
                  style={{ backgroundColor: "#F5F5DC" }} 
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label">
                  To the best of your knowledge, is this feedback something that
                  others in your situation would also share?
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="feedbackShared"
                    id="yesOption"
                  />
                  <label className="form-check-label" htmlFor="yesOption">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="feedbackShared"
                    id="noOption"
                  />
                  <label className="form-check-label" htmlFor="noOption">
                    No
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Please leave your email address if you would like us to
                  contact you regarding any questions.
                </label>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      style={{ backgroundColor: "#F5F5DC" }} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      style={{ backgroundColor: "#F5F5DC" }} 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@example.com"
                    style={{ backgroundColor: "#F5F5DC" }} 
                  />
                </div>
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Item Information</h5>
                <p>
                  <strong>Item:</strong> Product Name
                </p>
                <p>
                  <strong>Occasion:</strong> Occasion
                </p>
                <p>
                  <strong>Date:</strong> Month/Year
                </p>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddFeedback;
