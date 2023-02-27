// external imports
const jwt = require('jsonwebtoken');

const extractToken = (req) => {
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    const bearerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    const token = cookies ? cookies[process.env.COOKIE_NAME] : (bearerToken ? bearerToken : null);

    return token;
}

// check if user is logged in
const checkLogin = async (req, res, next) => {

    const token = extractToken(req);

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
        req.user = { ...decodedInfo };
        next();
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            errors: {
                common: {
                    message: 'Authentication failed!.. Please login again..'
                }
            }
        });
    }
}

const redirectLogin = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) return next();
    else {
        // token verification
        try {
            const decodedInfo = await jwt.verify(token, process.env.JWT_SECRET);
            // Temporary Redirect
            res.status(307).json({
                message: "Already logged in",
                user: { ...decodedInfo },
                isLoggedIn: true,
                isValidToken: true,
            });
        }
        catch (err) {
            next();
        }
    }
}




// export
module.exports = {
    checkLogin,
    redirectLogin,
};