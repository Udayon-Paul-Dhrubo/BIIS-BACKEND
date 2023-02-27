const redirectUrl = (req, res, next) => {

    console.log(req.user);

    const bearerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (bearerToken) {
        res.header('Authorization', 'Bearer ' + bearerToken);
    }


    if (req.user.userType === 'student')
        return res.redirect('/student');

    if (req.user.userType === 'teacher')
        return res.redirect('/teacher');

    if (req.user.userType === 'office')
        return res.redirect('/office');


    res.status(401).json({
        message: "Invalid user"
    });

    // res.status(200).json({
    //     message: "Welcome to the home page"
    // });

}

module.exports = {
    redirectUrl
};