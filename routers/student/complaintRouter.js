// external imports
const express = require("express");

// internal imports
const {
    getLocations,
    getTags,
    addComplaint
} = require("../../controllers/student/complaint/addComplaint");

const {
    complaintValidation,
    handleValidationErrors
} = require("../../middlewares/student/complaint/complaintValidation");

// config
const router = express.Router();


// get locations
router.get('/locations', getLocations);

// get tags
router.get('/tags', getTags);

// add new complaint
router.post('/', complaintValidation, handleValidationErrors, addComplaint);


//export
module.exports = router;