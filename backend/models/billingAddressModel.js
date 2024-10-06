// billingAddressModel.js
const mongoose = require('mongoose');

const billingAddressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        required: true,
    },
    streetAddress1: {
        type: String,
        required: true,
    },
    streetAddress2: {
        type: String,
        default: '',
    },
    townCity: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const BillingAddress = mongoose.model('BillingAddress', billingAddressSchema);

module.exports = BillingAddress;
