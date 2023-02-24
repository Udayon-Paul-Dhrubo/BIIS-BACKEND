// external imports
const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
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

    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Office',
    },

}, { timestamps: true });

// User Model
const User = mongoose.model('User', UserSchema);

// export the model
module.exports = User;