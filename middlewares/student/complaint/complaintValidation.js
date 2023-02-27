// external imports
const { check, validationResult } = require("express-validator");

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
        .isLength({ min: 1 })
        .withMessage("location is required")
    
];


// handle validation errors
const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

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