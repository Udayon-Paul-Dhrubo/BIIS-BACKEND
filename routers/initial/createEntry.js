// external imports
const express = require('express');

// internal imports
const addStudent = require('../../controllers/initialize/addStudent');
const addTeacher = require('../../controllers/initialize/addTeacher');
const addUser = require('../../controllers/initialize/addUser');
const createComplaint = require('../../controllers/initialize/createComplaint');

// config
const router = express.Router();

router.post("/student", addStudent);
router.post("/teacher", addTeacher);
router.post("/user", addUser);
router.post("/complaint", createComplaint);
// export
module.exports = router;