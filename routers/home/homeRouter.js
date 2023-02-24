// external imports
const express = require('express');

// internal imports
const { checkLogin } = require('../../middlewares/common/checkLogin');
const { getHomePage } = require('../../controllers/home/homePage');


// config
const router = express.Router();

// get home page
router.get('/', checkLogin, getHomePage);

// export
module.exports = router;