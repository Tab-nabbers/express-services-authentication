const express = require('express');
const router = express.Router();


const controller = require('./controller');

// Route
router.get('/', controller.home);
router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);

module.exports = router;