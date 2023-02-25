// external imports
const bcrypt = require('bcrypt');

// MODEL
const Teacher = require('../../database/models/Teacher');

// teacher login
const teacherLogin = async (req, res, next) => {
    console.log("inside teacher login");
    try {

        if (req.user) return next();

        // find the teacher having the given username
        const teacher = await Teacher.findOne({ email: req.body.username });

        if (!teacher || !teacher._id)
            return next();

        // compare the password
        const isValidPassword = await bcrypt.compare(
            req.body.password,
            teacher.password
        );

        if (!isValidPassword)
            return next();

        console.log("teacher: ", teacher);

        // prepare teacher info
        const teacherInfo = {
            name: teacher.name,
            email: teacher.email,
            department: teacher.department.name,
        };

        req.user = {
            ...teacherInfo,
            userType: 'teacher',
        }

        next();
    }
    catch (err) {
        next(err);
    }
};

module.exports = teacherLogin;