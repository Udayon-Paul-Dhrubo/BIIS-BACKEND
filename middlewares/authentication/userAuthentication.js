// external imports
const bcrypt = require('bcrypt');

// MODEL
const User = require('../../database/models/User');

// user login
const userLogin = async (req, res, next) => {
    console.log("inside user login");
    try {

        if (req.user) return next();

        // find the user having the given username
        const user = await User.findOne({ email: req.body.username });

        if (!user || !user._id)
            return next();

        // compare the password
        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isValidPassword)
            next();

        console.log("user: ", user);

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

        next();
    }
    catch (err) {
        next(err);
    }
};

module.exports = userLogin;