// external imports
const express = require("express");

// internal imports
const {
    getLocations,
    getTags,
    addComplaint,
    getComplaintByToken
} = require("../../controllers/student/complaintController");

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

// get complaint by token
router.get('/:complaint_token', getComplaintByToken);
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Just complaints home page. nothing to show. Try /:complaint_token"
    });
})

// add new complaint
router.post('/', complaintValidation, handleValidationErrors, addComplaint);



//export
module.exports = router;