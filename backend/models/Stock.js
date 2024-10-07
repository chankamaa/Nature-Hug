import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  Product_ID: {
    type: String,
    required: [true, 'Product ID is required'],
    trim: true,
  },
  Product_name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  Price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
    validate: {
      validator: (value) => value >= 0,
      message: 'Price must be a positive number',
    },
  },
  Qty: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    validate: {
      validator: (value) => value >= 0,
      message: 'Quantity must be a non-negative number',
    },
  },
  Total_Amount: {
    type: Number,
    required: [true, 'Total amount is required'],
    validate: {
      validator: function () {
        return this.Total_Amount >= 0;
      },
      message: 'Total amount must be a non-negative number',
    },
  },
  Status: {
    type: String,
    enum: {
      values: ['In Stock', 'Low Stock', 'Out of Stock'],
      message: '{VALUE} is not a valid stock status',
    },
    default: 'In Stock',
  },
});

// Pre-save hook to automatically calculate total amount based on Price * Qty
stockSchema.pre('save', function (next) {
  this.Total_Amount = this.Price * this.Qty;
  next();
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
