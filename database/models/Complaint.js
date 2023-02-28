// external imports
const mongoose = require('mongoose');

// Complaint Schema
const ComplaintSchema = mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    },

    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    anonimity: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved', 'rejected', 'forwarded'],
        default: 'pending',
        trim: true,
    },

    subject: {
        type: String,
        required: true,
        trim: true,
    },

    complaint_body: {
        type: String,
        required: true,
        trim: true,
    },

    remarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ComplaintRemark',
    }],

    concerned_office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Office',
    }

}, { timestamps: true });

// Complaint Model
const Complaint = mongoose.model('Complaint', ComplaintSchema);

// export the model
module.exports = Complaint;