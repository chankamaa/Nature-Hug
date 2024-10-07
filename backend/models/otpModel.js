import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

export default mongoose.model('OTP', otpSchema);
