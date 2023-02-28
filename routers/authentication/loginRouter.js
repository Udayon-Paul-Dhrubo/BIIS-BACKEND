// external imports
const express = require("express");

// internal imports
const { redirectLogin } = require("../../middlewares/common/checkLogin");

const {
    loginValidation,
    handleValidationErrors
} = require("../../middlewares/authentication/loginValidation");

const {
    getLoginPage,
    logout,
    login
} = require("../../controllers/authentication/login");

const authentication = require("../../middlewares/authentication/combineAuthentication");


// config
const router = express.Router();

// get login page
router.get("/", getLoginPage);

// logout
router.delete("/", logout);

// login
router.post("/", redirectLogin, loginValidation, handleValidationErrors, authentication, login);

// export
module.exports = router;

