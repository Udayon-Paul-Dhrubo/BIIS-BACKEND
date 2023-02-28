//internal imports
const studentAuth = require('./studentAuthentication');
const teacherAuth = require('./teacherAuthentication');
const userAuth = require('./userAuthentication');

// combine authentication
const combineAuthentication = async (req, res, next) => {

    try {
        await studentAuth(req, res, async (err) => {
            if (err) throw err;

            await teacherAuth(req, res, async (err) => {
                if (err) throw err;

                await userAuth(req, res, async (err) => {
                    if (!err) return next();

                    throw err;
                });
            });
        });
    }
    catch (err) {

        console.log("================== inside combine authentication error ==================");
        // Internal Server Error
        console.log(err);

        res.status(400).json({
            data: {
                //ensuring that the user doesn't have to retype the username
                username: req.body.username,
            },
            errors: {
                common: {
                    message: err.message
                }
            }
        });
    }
};

module.exports = combineAuthentication;