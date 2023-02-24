//internal imports
const studentAuth = require('./studentAuthentication');
const teacherAuth = require('./teacherAuthentication');
const userAuth = require('./userAuthentication');

// combine authentication
const combineAuthentication = async (req, res, next) => {

    try {
        await studentAuthMiddleware(req, res, async (err) => {
            if (!err) return next();

            await teacherAuthMiddleware(req, res, async (err) => {
                if (!err) return next();

                await userAuthMiddleware(req, res, async (err) => {
                    if (!err) return next();

                    // wrong username or password
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
                });
            });
        });
    }
    catch (err) {
        next(err);
    }
};

module.exports = combineAuthentication;