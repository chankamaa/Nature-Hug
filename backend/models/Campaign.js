import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    campaignName: {
        type: String,
        required: true
    },
    emailSubject: {
        type: String,
        required: true
    },
    emailContent: {
        type: String,
        required: true
    },
    recipients: {
        type: [String], 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'], 
        default: 'pending'
    }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
 