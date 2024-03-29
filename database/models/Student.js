// external imports
const mongoose = require('mongoose');

// Student Schema
const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    studentId: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    }

}, { timestamps: true });

// Student Model
const Student = mongoose.model('Student', StudentSchema);

// export the model
module.exports = Student;