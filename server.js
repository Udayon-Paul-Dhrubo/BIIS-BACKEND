// external imports
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// internal imports
const connectDB = require('./database/dbConnection');
const {
    notFoundHandler,
    errorHandler
} = require('./middlewares/common/errorHandler');

// routers
const homeRouter = require('./routers/home/homeRouter');
const loginRouter = require('./routers/authentication/loginRouter');
const studentRouter = require('./routers/student/studentRouter');


//! only for database creation
const createRouter = require('./routers/initial/createEntry');

// app config
const app = express();
dotenv.config();

// database connection
connectDB();

// request parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// API routes
app.use("/login", loginRouter);
app.use('*', homeRouter);
app.use("/create", createRouter);
app.use("/student", studentRouter);

// 404 error handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

// server listener
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`)
});




