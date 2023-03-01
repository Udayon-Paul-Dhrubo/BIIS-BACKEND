// external imports
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// internal imports
const Location = require("../../../database/models/Location");
const Tag = require("../../../database/models/Tag");

// internal imports

// complaint validation
const complaintValidation = [

    // check subject field
    check("subject")
        .isLength({ min: 1 })
        .withMessage("Subject is required"),

    // check complaint_body field
    check("complaint_body")
        .isLength({ min: 1 })
        .withMessage("complaint_body is required"),


    // check location field
    check("location")
        .isObject()
        .withMessage("Location object is required")
        .custom(async (location) => {

            if (!location._id) throw new Error("Location id is required");

            const locationExists = await Location.exists({ _id: location._id });
            if (!locationExists) throw new Error("Invalid location : " + location._id);
        }),

    // check tags field
    check("tags")
        .isArray()
        .withMessage("Tags must be an array of objects or may b empty array")
        .custom(async (tags) => {

            if (!tags.length) throw new Error("Minimum one tag is required");

            if (tags.length) {
                for (let i = 0; i < tags.length; i++) {

                    if (!tags[i]._id) throw new Error("Include Tag Id of : " + tags[i]);

                    const tagExists = await Tag.exists({ _id: tags[i]._id });
                    if (!tagExists) throw new Error("Invalid tag : " + tags[i]);
                }
            }
        })
];


// handle validation errors
const handleValidationErrors = (req, res, next) => {

    console.log('handle validation result : ' + req.body.params);


    const errors = validationResult(req.body.params);
    const mappedErrors = errors.mapped();

    console.log(" in complaint validation : " + mappedErrors.length);

    if (Object.keys(mappedErrors).length === 0) {
        return next();
    }
    else {
        console.log(mappedErrors);
        // unprocessable entity
        res.status(422).json({
            errors: mappedErrors
        });
    }
};


// exports
module.exports = {
    complaintValidation,
    handleValidationErrors
};