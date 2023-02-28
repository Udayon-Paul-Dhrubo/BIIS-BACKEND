// external imports
const createError = require('http-errors');

// 404 error handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, 'Page not found..'));
};

// default error handler
const errorHandler = (err, req, res, next) => {
    console.log(err);

    res.status(err.status || 500);

    res.json({
        errors: { message: err.message }
    });
};

// export
module.exports = {
    notFoundHandler,
    errorHandler
};