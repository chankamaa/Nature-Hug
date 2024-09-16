import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  Product_ID: {
    type: String,
    required: true,
  },
  Product_name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Qty: {
    type: Number,
    required: true,
  },
  Total_Amount: {
    type: Number,
    required: true,
  },
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
