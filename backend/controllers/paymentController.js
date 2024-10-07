import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';  // for file uploads

const router = express.Router();

// Mock data to simulate existing orders
let mockOrders = {};

// Handle card payment
router.post('/card', (req, res) => {
    const { cardNumber, expiryDate, cvv, amount } = req.body;
    if (cardNumber && expiryDate && cvv) {
        // Simulate card validation
        const isCardValid = cardNumber.length === 16 && cvv.length === 3;
        if (isCardValid) {
            const orderId = `ORDER-${Math.random().toString(36).substr(2, 9)}`;
            mockOrders[orderId] = { amount, status: 'Paid' };
            return res.status(200).json({ success: true, message: 'Card payment successful', orderId });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid card details' });
        }
    }
    res.status(400).json({ success: false, message: 'Payment failed' });
});

// Handle bank transfer with file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/bank', upload.single('paymentSlip'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const orderId = `ORDER-${Math.random().toString(36).substr(2, 9)}`;
    mockOrders[orderId] = { amount: req.body.amount, status: 'Pending', paymentSlip: req.file.path };
    res.status(200).json({ success: true, message: 'Bank transfer initiated', orderId, filePath: req.file.path });
});

// Handle cash on delivery
router.post('/cod', (req, res) => {
    const orderId = `ORDER-${Math.random().toString(36).substr(2, 9)}`;
    mockOrders[orderId] = { amount: req.body.amount, status: 'COD Selected' };
    res.status(200).json({ success: true, message: 'Cash on Delivery selected', orderId });
});

export default router;
