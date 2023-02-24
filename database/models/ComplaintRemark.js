// external imports
const mongoose = require('mongoose');

// ComplaintRemark Schema
const ComplaintRemarkSchema = mongoose.Schema({
    complaint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
    },

    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Office',
    },

    remark_body: {
        type: String,
        required: true,
        trim: true,
    },

    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// ComplaintRemark Model
const ComplaintRemark = mongoose.model('ComplaintRemark', ComplaintRemarkSchema);

// export the model
module.exports = ComplaintRemark;