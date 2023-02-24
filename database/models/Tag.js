// external imports
const mongoose = require('mongoose');

// Tag Schema
const TagSchema = mongoose.Schema({
    tag_name: {
        type: String,
        required: true,
        trim: true,
    }
});

// Tag Model
const Tag = mongoose.model('Tag', TagSchema);

// export the model
module.exports = Tag;