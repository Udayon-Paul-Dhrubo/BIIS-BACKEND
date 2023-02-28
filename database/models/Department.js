//external imports
const mongoose = require('mongoose');


// Department Schema
const DepartmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
});

// Department Model
const Department = mongoose.model('Department', DepartmentSchema);

// export the model
module.exports = Department;