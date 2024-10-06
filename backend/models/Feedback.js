import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  productType: { type: String, required: true },
  rating: { type: Number, required: true },
  suggestions: String,
  feedbackShared: { type: String, enum: ['yes', 'no']},
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
}, { timestamps: true });


const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;