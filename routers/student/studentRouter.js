// external imports
const express = require("express");

// internal imports
const complaintRouter = require("./complaintRouter");
const { checkLogin } = require("../../middlewares/common/checkLogin");
const { getStudentHomePage } = require("../../controllers/student/homePage");


// config
const router = express.Router();

router.get("/", checkLogin, getStudentHomePage);
router.use("/complaint", checkLogin,  complaintRouter);

//export
module.exports = router;