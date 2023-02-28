// external imports
const express = require('express');

// internal imports
const { checkLogin } = require('../../middlewares/common/checkLogin');
const { redirectUrl } = require('../../controllers/home/homePage');


// config
const router = express.Router();

// get home page
router.get("/", checkLogin, redirectUrl);

// export
module.exports = router;