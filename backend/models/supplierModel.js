import mongoose from 'mongoose';

// Regular expression to validate that Suppliername contains only alphabetic characters and spaces
const nameValidationRegex = /^[A-Za-z\s]+$/;

const SupplierSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    unique: true, // Ensure ID is unique
  },
  Suppliername: {
    type: String,
    required: [true, 'Supplier name is required'],
    validate: {
      validator: function (v) {
        return nameValidationRegex.test(v); // Ensure only alphabetic characters and spaces
      },
      message: props => `${props.value} is not a valid name! Only alphabetic characters and spaces are allowed.`
    }
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
  },
});

// Ensure the ID field is unique to prevent duplicate suppliers
SupplierSchema.index({ ID: 1 }, { unique: true });

const Supplier = mongoose.model('Supplier', SupplierSchema);
export default Supplier;
