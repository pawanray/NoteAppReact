const express = require('express');
const { registerUser, authUser } = require('../controlers/userControler');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(authUser);


module.exports = router;