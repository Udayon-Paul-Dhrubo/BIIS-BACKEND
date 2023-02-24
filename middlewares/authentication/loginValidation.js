// external imports
const { check, validationResult } = require("express-validator");

// login validation
const loginValidation = [

    // check student_id field
    check("username")
        .isLength({ min: 1 })
        .withMessage("Student ID is required"),

    // check password field
    check("password")
        .isLength({ min: 1 })
        .withMessage("Password is required")
];


// handle validation errors
const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        return next();
    }
    else {
        // unprocessable entity
        res.status(422).json({
            errors: mappedErrors
        });
    }
};


// exports
module.exports = {
    loginValidation,
    handleValidationErrors
};