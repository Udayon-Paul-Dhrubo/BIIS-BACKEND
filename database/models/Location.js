// external imports
const mongoose = require('mongoose');

// Location Schema
const LocationSchema = mongoose.Schema({
    location_name: {
        type: String,
        required: true,
        trim: true,
    }
});

// Location Model
const Location = mongoose.model('Location', LocationSchema);

// export the model
module.exports = Location;