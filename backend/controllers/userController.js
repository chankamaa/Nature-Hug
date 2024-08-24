// controllers/userController.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
        user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } else {
        res.status(200).json(user);
    }
};

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
