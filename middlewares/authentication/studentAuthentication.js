// external imports
const bcrypt = require('bcrypt');


// MODEL
const Student = require('../../database/models/Student');

// student login
const studentLogin = async (req, res, next) => {

    console.log("inside student login");
    try {
        // find the student having the given username
        const student = await Student.findOne({ studentId: req.body.username });

        if (!student || !student._id)
            return next();

        // compare the password
        const isValidPassword = await bcrypt.compare(
            req.body.password,
            student.password
        );

        if (!isValidPassword)
            return next();
        
        
        console.log("student: ", student);

        // prepare student info
        const studentInfo = {
            name: student.name,
            studentID: student.studentId,
            department: student.department.name,
        };

        req.user = {
            ...studentInfo,
            userType: 'student',
        }

        next();
    }
    catch (err) {
        next(err);
    }
};

module.exports = studentLogin;

