import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { registerValidation, loginValidation } from '../utils/validation.js';

const signUp = async (req, res, next) => {
    // Validation
    const { error } = registerValidation(req.body);
    if (error) return res.send(error.details[0].message);

    // Check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user exists
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(400).send("Email doesn't exist");

    // Check password
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) return res.status(400).send("Invalid password");

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Auth successful", ...user, token });
}

//view user
const getUserDetails = async (req, res, next) => {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId).lean(); // Ensure to include necessary user details
      if (!user) return res.status(404).send('User not found');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send('Server Error');
    }
}
  
//delete user
const deleteUser = async (req, res, next) => {
    let userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).send({ status: "Member Removed"});

    } catch(error) {
        res.status(500).send({ status: "Error with deleting member", error: err.message })
    }
    
}

//update user
const updateUser = async (req, res, next) => {
    let userId = req.params.id;

    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    } = req.body;

    const updatedUserData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {new: true});
        res.status(200).send({ status: "Member Updated Successfully", updatedUser});

    } catch (error) {
        res.status(400).send({ status : "Error with updating data", error: err.message});

    }

}

export default {
    signIn,
    signUp,
    getUserDetails,
    deleteUser,
    updateUser
};
