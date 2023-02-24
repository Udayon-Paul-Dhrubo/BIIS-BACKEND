// external imports
const express = require("express");

// internal imports
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
router.post("/", loginValidation, handleValidationErrors, authentication, login);

