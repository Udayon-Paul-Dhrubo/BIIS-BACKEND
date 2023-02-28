//external imports
const bcrypt = require("bcrypt");

//internal imports
const User = require("../../database/models/User");
const Office = require("../../database/models/Office");

const addUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash("1234", 10);

        const office = await Office.findOne({ name: req.body.office });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            office: office._id,
        });

        await newUser.save();

        res.status(200).json({
            message: "User was added successfully!",
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

module.exports = addUser;