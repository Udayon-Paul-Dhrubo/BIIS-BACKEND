// external imports
const express = require("express");

// internal imports
const { checkLogin } = require("../../middlewares/common/checkLogin");
const { getStudentHomePage } = require("../../controllers/teacher/homePageController");

// config
const router = express.Router();

router.get("/", checkLogin, getStudentHomePage);

//export
module.exports = router;