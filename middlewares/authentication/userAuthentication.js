// external imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// MODEL
const User = require('../../database/models/User');

// user login
const userLogin = async (req, res, next) => {
    try {
        // find the user having the given username
        const user = await User.findOne({ email: req.body.username });

        if (!user || !user._id)
            next();

        // compare the password
        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isValidPassword)
            next();

        // prepare user info
        const userInfo = {
            name: user.name,
            email: user.email,
            office: user.office.name,
        };

        req.user = {
            ...userInfo,
            userType: 'office',
        }
    }
    catch (err) {
        next(err);
    }
};

module.exports = userLogin;