// external imports
const createError = require("http-errors");

//internal imports
const Complaint = require("../../database/models/Complaint");



// get all complaints
const getAllComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    }
    catch (err) {
        next(err);
    }
};


// get complaint by token
const getComplaintByToken = async (req, res, next) => {
    try {
        const complaint = await Complaint.findById(req.params.complaint_token);
        res.status(200).json(complaint);
    }
    catch (err) {
        next(err);
    }
};


// update complaint by token
const updateComplaintByToken = async (req, res, next) => {
    try {








        const complaint = await Complaint.findByIdAndUpdate(req.params.complaint_token, req.body, { new: true });
    }
    catch (err) {

    }
};



