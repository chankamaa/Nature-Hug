import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

const ViewComplains = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Handle the search bar
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.productNameOrService
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handle Generate Report and download as PDF
  const handleGenerateReport = (complaint) => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(20);
    doc.text("Nature Hug Complaint Handling Team", 10, 10);
    
    // Add a line break
    doc.setFontSize(12);
    doc.text("==========================================", 10, 15);
    
    // Add a subtitle for the report
    doc.setFontSize(16);
    doc.text("Complaint Report", 10, 20);
    
    // Add a message
    doc.setFontSize(12);
    doc.text("Sorry for your inconvenience. We will work on your complaint as soon as possible.", 10, 30);
    doc.text("Thank you very much for your understanding!", 10, 35);
  
    // Add a line break
    doc.text("==========================================", 10, 45);
    
    // Add complaint details to PDF
    doc.setFontSize(12);
    doc.text(`Name with Initials: ${complaint.nameWithInitials}`, 10, 50);
    doc.text(`Phone Number: ${complaint.phoneNo}`, 10, 55);
    doc.text(`Date of Incident: ${complaint.dateOfIncident}`, 10, 60);
    doc.text(`Complaint Details: ${complaint.complaintDetails}`, 10, 65);
    doc.text(`Product/Service: ${complaint.productNameOrService}`, 10, 70);
    doc.text(`Desired Resolution: ${complaint.desiredResolution}`, 10, 75);
    doc.text(`Additional Comments: ${complaint.additionalComments}`, 10, 80);
    doc.text(`Status: ${complaint.status}`, 10, 85);
  
    // Add a footer
    doc.text("==========================================", 10, 95);
    doc.setFontSize(10);
    doc.text("This is an automated message. Please do not reply.", 10, 100);
  
    // Save the PDF
    doc.save("complaint_report.pdf");
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
              src="src\assets\com.jpg"
              style={{ width: "50px", height: "50px" }}
            />
            <h1 className="ml-3">Your Complaint Status</h1>
          </div>
        </div>

        <div className="col-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Product/Service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Registration Date</th>
                  <th scope="col">Last Updated Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Generate Report</th>
                  <th scope="col">To Do</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(complaint.updatedAt).toLocaleDateString()}
                    </td>
               
                    <td>{complaint.status}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleGenerateReport(complaint)}
                      >
                        Download PDF
                      </button>
                    </td>
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
