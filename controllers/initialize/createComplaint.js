// external imports
const createError = require("http-errors")

//internal imports
const Student = require("../../database/models/Student");
const Location = require("../../database/models/Location");
const Tag = require("../../database/models/Tag");
const Complaint = require("../../database/models/Complaint");
const Office = require("../../database/models/Office");

const createComplaint = async (req, res, next) => {
    try {
        const location = await Location.findOne({ location_name: req.body.location });
        if (!location) throw createError(404, "location not found");


        const tags = await Tag.find({ tag_name: { $in: req.body.tags } });
        if (!tags) throw createError(404, "tags not found");

        const student = await Student.findOne({ studentId: req.body.studentId });
        if (!student) throw createError(404, "student not found");

        const office = await Office.findOne({ name: "DSW" });
        if (!office) throw createError(404, "office not found");

        const newComplaint = new Complaint({
            location: location._id,
            tags: tags.map(tag => tag._id),
            student: student._id,
            anonimity: req.body.anonimity,
            subject: req.body.subject,
            complaint_body: req.body.complaint_body,
            concerned_office: office._id,
        });

        await newComplaint.save();

        res.status(200).json({
            message: "Complaint was added successfully!",
        });

    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};

module.exports = createComplaint;

