import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import OTP from '../models/otpModel.js';
import { registerValidation, loginValidation } from '../utils/validation.js';

// Generate and send OTP
export const signUpRequest = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, role } = req.body;

    // Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Check if the user already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(400).json({ message: "Email already exists" });

    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your sending email address
            pass: process.env.EMAIL_PASS  // Your email password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);

        // Save OTP in the database with expiration
        const otpData = new OTP({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60000) // OTP expires in 5 minutes
        });
        await otpData.save();

        res.status(200).json({ message: "OTP sent successfully. Please verify OTP to complete registration." });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: "Error sending OTP email." });
    }
};

// Verify OTP and complete registration
export const signUpVerify = async (req, res) => {
    const { email, otp, password, firstName, lastName, phoneNumber } = req.body;

    // Check if the password is provided
    if (!password) {
        return res.status(400).json({ message: "Password is required." });
    }

    // Check if first name, last name, and phone number are provided
    if (!firstName || !lastName || !phoneNumber) {
        return res.status(400).json({ message: "First name, last name, and phone number are required." });
    }

    try {
        // Find the latest OTP for the given email
        const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found. Please request OTP again." });
        }

        // Check if OTP is expired
        if (otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP expired. Please request OTP again." });
        }

        // Verify OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP. Please check the OTP and try again." });
        }

        // If OTP is valid, register the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,        // First name
            lastName,         // Last name
            email,            // Email
            phoneNumber,      // Phone number
            password: hashedPassword, // Hashed password
            role: req.body.role || 'User' // Default role if not provided
        });

        // Save user to the database
        await user.save();
        
        // Optionally delete OTP record after successful verification
        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ message: "User registered successfully." });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};


// Sign In
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Check if the user is admin
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'Admin' }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ role: 'Admin', message: "Admin Auth successful", token });
    }

    // Check if the user exists
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(400).json({ message: "Email doesn't exist" });

    // Check password
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) return res.status(400).json({ message: "Invalid password" });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Auth successful", ...user, token });
};

// View user details
export const getUserDetails = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).lean(); 
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ status: "Member Removed" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ status: "Error with deleting member", error: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    const userId = req.params.id;

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const updatedUserData = {
        firstName,
        lastName,
        email,
        phoneNumber,
    };

    if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedUserData.password = await bcrypt.hash(password, salt); // Hash the password if provided
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        res.status(200).json({ status: "Member Updated Successfully", updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ status: "Error with updating data", error: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean(); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export default {
    signUpRequest,
    signUpVerify,
    signIn,
    getUserDetails,
    deleteUser,
    updateUser,
    getAllUsers,
};
