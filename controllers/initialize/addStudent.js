//external imports
const bcrypt = require("bcrypt");

//internal imports
const Student = require("../../database/models/Student");
const Department = require("../../database/models/Department");

const addStudent = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash("1234", 10);

        const dept = await Department.findOne({ name: "CSE" });

        const newStudent = new Student({
            ...req.body,
            password: hashedPassword,
            department: dept._id,
        });

        await newStudent.save();

        res.status(200).json({
            message: "Student was added successfully!",
        });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};

module.exports = addStudent;