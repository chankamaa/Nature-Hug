import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const ViewComplains = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/GetComplaints"
        );
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Handle the View Details button click
  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  // Handle the Close button click
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  // Handle the Delete button click
  const handleDeleteComplaint = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/DeleteComplaints/${id}`);
        setComplaints(complaints.filter((complaint) => complaint._id !== id));

        Swal.fire("Deleted!", "Your complaint has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
      Swal.fire(
        "Error",
        "There was an error deleting the complaint. Please try again.",
        "error"
      );
    }
  };

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12 text-center my-4">
          <div className="d-flex justify-content-center align-items-center">
            <img
              className="rounded-circle"
              loading="lazy"
              alt=""
              src="/ellipse-5@2x.png"
              style={{ width: "50px", height: "50px" }}
            />
            <h1 className="ml-3">Your Complaint Status</h1>
          </div>
        </div>

        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Complaint No</th>
                  <th scope="col">Registration Date</th>
                  <th scope="col">Last Updated Date</th>
                  <th scope="col">Action</th>
                  <th scope="col">Status</th>
                  <th scope="col">To Do</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, index) => (
                  <tr key={complaint._id}>
                    <td>#{index + 1}</td>
                    <td>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(complaint.updatedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-success ml-1"
                        onClick={() => handleViewDetails(complaint)}
                      >
                        View Details
                      </button>
                    </td>
                    <td>{complaint.status}</td>
                    <td>
                      <button
                        className="btn btn-danger ml-1"
                        onClick={() => handleDeleteComplaint(complaint._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Complaint Details */}

      <div
  className={`modal fade ${showModal ? "show" : ""}`}
  style={{ display: showModal ? "block" : "none" }}
  tabIndex="-1"
  role="dialog"
  aria-labelledby="complaintDetailsModalLabel"
  aria-hidden={!showModal}
>
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="complaintDetailsModalLabel">
          Complaint Details
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={handleCloseModal}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        {selectedComplaint && (
          <div>
            <p className="mb-2">
              <strong>Name with Initials:</strong> {selectedComplaint.nameWithInitials}
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {selectedComplaint.phoneNo}
            </p>
            <p className="mb-2">
              <strong>Date of Incident:</strong> {selectedComplaint.dateOfIncident}
            </p>
            <p className="mb-2">
              <strong>Complaint Details:</strong> {selectedComplaint.complaintDetails}
            </p>
            <p className="mb-2">
              <strong>Product/Service:</strong> {selectedComplaint.productNameOrService}
            </p>
            <p className="mb-2">
              <strong>Desired Resolution:</strong> {selectedComplaint.desiredResolution}
            </p>
            <p className="mb-2">
              <strong>Additional Comments:</strong> {selectedComplaint.additionalComments}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {selectedComplaint.status}
            </p>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

    </section>
  );
};

export default ViewComplains;
