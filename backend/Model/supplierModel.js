import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true, // Validate that ID is required
  },
  Suppliername: {
    type: String,
    required: true, // Validate that Suppliername is required
  },
  Description: {
    type: String,
    required: true, // Validate that Description is required
  },
  Contactinfor: {
    type: Number,
    required: true, // Validate that Contactinfor is required
  },
  Product: {
    type: String, // Validate that Product is required
    required: true, 
  }
});

const Supplier = mongoose.model('Supplier', SupplierSchema);

export default Supplier;
