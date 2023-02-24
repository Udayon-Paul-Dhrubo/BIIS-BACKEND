//external imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');




// login page
const getLoginPage = (req, res, next) => {
    res.status(200).json({ message: "Login page" });
};

// logout
const logout = (req, res, next) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({ message: "Logout successful" });
};

// login
const login = async (req, res, next) => {
    try {

        if (!req.user) throw createError("Internal Server Error");

        const userInfo = req.user;

        // generate token
        const token = jwt.sign(
            userInfo,
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
            expiresIn: process.env.JWT_EXPIRES_IN,
            httpOnly: true,
            signed: true,
        });

        // send response
        res.status(200).json({
            message: "login successful",
            access_token: token,
            body: {
                user: { ...userInfo }
            }
        });
    }

    catch (err) {
        console.log(err);

        res.status(400).json({
            data: {
                //ensuring that the user doesn't have to retype the username
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                }
            }
        });
    }

};


// exports
module.exports = {
    getLoginPage,
    logout,
    login
};
