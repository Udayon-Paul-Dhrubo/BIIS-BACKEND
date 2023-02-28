// get home page
const getStudentHomePage = (req, res) => {
    res.status(200).json({
        message: "Welcome to the teacher home page"
    });
}

module.exports = {
    getStudentHomePage
};