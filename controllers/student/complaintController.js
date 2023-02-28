// external imports
const createError = require("http-errors");

//internal imports
const Complaint = require("../../database/models/Complaint");
const Location = require("../../database/models/Location");
const Tag = require("../../database/models/Tag");

const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    }
    catch (err) {
        next(err);
    }
};

const getTags = async (req, res, next) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    }
    catch (err) {
        next(err);
    }
};

// add a new complaint
const addComplaint = async (req, res, next) => {
    try {

        const tags = req.body.tags.map(tag => tag._id);
        const locationId = req.body.location._id;


        const complaint = new Complaint({
            location: locationId,
            tags: tags,
            student: (req.user._id) ? req.user._id : null,
            anonimity: req.body.anonimity || false,
            subject: req.body.subject,
            complaint_body: req.body.complaint_body
        });

        const savedComplaint = await complaint.save();

        res.status(200).json({
            message: "Complaint added successfully",
            data: {
                complaint_token: savedComplaint._id,
            }
        });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: err.message,
            data: { ...req.body }
        });
    }
};


const getComplaintByToken = async (req, res, next) => {
    try {

        // const complaintExists = await Complaint.exists({ _id: req.params.complaint_token });
        // if (!complaintExists) throw createError(404, "Complaint not found");

        const complaint = await Complaint.findOne({ _id: req.params.complaint_token })
        .populate("location")
        .populate("tags")
        .populate("student");

        if (!complaint) throw createError(404, "Complaint not found");

        res.status(200).json(complaint);
    }
    catch (err) {
        next(err);
    }
}


module.exports = {
    getLocations,
    getTags,
    addComplaint,
    getComplaintByToken
};