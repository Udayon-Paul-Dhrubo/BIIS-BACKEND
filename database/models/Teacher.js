// external imports
const mongoose = require('mongoose');

// Teacher Schema
const TeacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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

// Teacher Model
const Teacher = mongoose.model('Teacher', TeacherSchema);

// export the model
module.exports = Teacher;