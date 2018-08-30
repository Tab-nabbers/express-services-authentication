const express = require('express');
const router = express.Router();

// Importing files
const { validateCookies } = require('../utils/validateCookies');
const controller = require('./controller');

// Route
router.get('/', controller.home);
router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);
router.post('/save', validateCookies, controller.save);

router.get('/profile', validateCookies, controller.findUserProfileByIdAndEmail);

module.exports = router;