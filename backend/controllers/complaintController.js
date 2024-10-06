import Complaint from "../models/Complaint.js";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({});
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};
// Make sure to import your Complaint model
//create complaint
export const createComplaint = async (req, res) => {
  const {
    nameWithInitials,
    phoneNo,
    dateOfIncident,
    complaintDetails,
    productNameOrService,
    desiredResolution,
    additionalComments,
    status,
  } = req.body;

  // Validation checks to ensure all required fields are provided
  if (!nameWithInitials || !phoneNo || !dateOfIncident || !complaintDetails || !productNameOrService || !desiredResolution) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  try {
    // Step 1: Save the complaint in the database
    const newComplaint = new Complaint({
      nameWithInitials,
      phoneNo,
      dateOfIncident,
      complaintDetails,
      productNameOrService,
      desiredResolution,
      additionalComments,
      status,
    });
    
    const savedComplaint = await newComplaint.save();

    // Step 2: Send a success response with the saved complaint
    res.status(201).json({
      message: "Complaint created successfully",
      complaint: savedComplaint,
    });

  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// @desc    Update a complaint
// @route   PUT /api/complaints/:id
// @access  Public
export const updateComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json(updatedComplaint);
  } catch (error) {
    res.status(400).json({ message: "Error updating complaint" });
  }
};

// @desc    Delete a complaint
// @route   DELETE /api/complaints/:id
// @access  Public
export const deleteComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting complaint" });
  }
};
