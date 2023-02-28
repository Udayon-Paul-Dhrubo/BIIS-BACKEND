//external imports
const mongoose = require('mongoose');


// Office Schema
const OfficeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
});

// Office Model
const Office = mongoose.model('Office', OfficeSchema);

// export the model
module.exports = Office;