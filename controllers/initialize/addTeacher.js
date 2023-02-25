//external imports
const bcrypt = require("bcrypt");

//internal imports
const Teacher = require("../../database/models/Teacher");
const Department = require("../../database/models/Department");

const addTeacher = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash("1234", 10);

        const dept = await Department.findOne({ name: req.body.dept });

        const newTeacher = new Teacher({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            department: dept._id,
        });

        await newTeacher.save();

        res.status(200).json({
            message: "Teacher was added successfully!",
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

module.exports = addTeacher;