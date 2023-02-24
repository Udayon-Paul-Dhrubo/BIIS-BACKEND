// external imports
const mongoose = require('mongoose');

// Complaint_Tag Schema
const Complaint_Tag_Schema = mongoose.Schema({
    complaint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
        required: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
    }],
});

// Complaint_Tag Model
const Complaint_Tag = mongoose.model('Complaint_Tag', Complaint_Tag_Schema);

// export the model
module.exports = Complaint_Tag;