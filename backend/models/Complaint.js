import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema({
  nameWithInitials: { type: String, required: true },
  phoneNo: { type: String, required: true },
  dateOfIncident: { type: String, required: true },
  complaintDetails: { type: String, required: true },
  productNameOrService: { type: String, required: true },
  desiredResolution: { type: String, required: true },
  additionalComments: { type: String },
  status : {type: String},
  
}, {
  timestamps: true,
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
