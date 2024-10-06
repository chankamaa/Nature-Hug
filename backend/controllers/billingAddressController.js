// billingAddressController.js
const BillingAddress = require('./billingAddressModel');

exports.createBillingAddress = async (req, res) => {
    try {
        const newAddress = new BillingAddress(req.body);
        await newAddress.save();
        res.status(201).json({ message: 'Billing address saved successfully!', data: newAddress });
    } catch (error) {
        res.status(400).json({ message: 'Error saving billing address', error: error.message });
    }
};
