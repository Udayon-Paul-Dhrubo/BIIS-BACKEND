// external imports
const jwt = require('jsonwebtoken');

// check if user is logged in
const checkLogin = async (req, res, next) => {
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    const bearerToken = req.headers.authorization?.split(' ')[1];

    const token = cookies ? cookies[process.env.COOKIE_NAME] : bearerToken;

    if (!token) {
        return res.status(403).json({
            message: 'Authentication failed! Please login Again..',
            isLoggedIn: false,
            isValidToken: false,
        });
    }

    // token verification
    try {
        const decodedInfo = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedInfo;
        next();
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            errors: {
                common: {
                    message: 'Authentication failed!'
                }
            }
        });
    }
}




// export
module.exports = {
    checkLogin
};