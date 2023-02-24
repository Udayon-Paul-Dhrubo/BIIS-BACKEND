// get home page
const getHomePage = (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to the home page',
        isLoggedIn: true,
        isValidToken: true,
    });
};

// exports
module.exports = {
    getHomePage,
};