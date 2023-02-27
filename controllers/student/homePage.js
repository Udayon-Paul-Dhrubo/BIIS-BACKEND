// get home page
const getStudentHomePage = (req, res) => {
    res.status(200).json({
        message: "Welcome to the student home page"
    });
}

module.exports = {
    getStudentHomePage
};