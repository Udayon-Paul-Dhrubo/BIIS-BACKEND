//external imports
const createError = require('http-errors');

//internal imports
const Complaint = require("../../../database/models/Complaint");
const Location = require("../../../database/models/Location");
const Tag = require("../../../database/models/Tag");
const Student = require("../../../database/models/Student");

const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    }
    catch (err) {
        next(err);
    }
};

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    }
    catch (err) {
        next(err);
    }
};



// add a new complaint
const addComplaint = async (req, res) => {
    try {

        if (!req.body.location._id) throw createError("Location is required");

        if (req.body.tags.length) {
            for (let i = 0; i < req.body.tags.length; i++) {
                if (!req.body.tags[i]._id) throw createError("Tags are required");
            }
        }

        const student = await Student.findOne({ user: req.user.studentId });

        if (!student) throw createError("Student not found");

        const tags = req.body.tags.map(tag => tag._id);
        const locationId = req.body.location._id;

        const complaint = await Complaint.create({
            location: locationId,
            tags: tags,
            student: student._id,
            anonimity: req.body.anonimity || false,
            subject: req.body.subject,
            complaint_body: req.body.complaint_body
        });

        await complaint.save();

        res.status(200).json({
            message: "Complaint added successfully",
            complaint
        });
    }
    catch (err) {
        next(err);
    }
};


module.exports = {
    getLocations,
    getTags,
    addComplaint
};