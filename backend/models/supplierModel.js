import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true, 
  },
  Suppliername: {
    type: String,
    required: true, 
  },
  Description: {
    type: String,
    required: true, 
  },
  Contactinfor: {
    type: Number,
    required: true, 
  },
  Product: {
    type: String, 
    required: true, 
  }
});

const Supplier = mongoose.model('Supplier', SupplierSchema);

export default Supplier;
