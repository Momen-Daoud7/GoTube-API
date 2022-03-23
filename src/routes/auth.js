const express = require('express');
const  {
	logout,
	register,
	login,
	confirmEmail,
	forgotPassword,
	resetPassword,
	profile
} = require('../controllers/auth');

// Middlewares
const { protect } = require('../middleware/auth');

// Validation
const {
	loginValidationRules,
	loginValidate,
	registerValidationRules,
	registerValidate
} = require('../validation/auth');

const router = express.Router();

router.get('/profile',protect,profile);
router.post('/register',registerValidationRules() , registerValidate ,register);
router.post('/login',loginValidationRules(),loginValidate,login);
router.post('/confirm/:token',confirmEmail);
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword/:resetToken',resetPassword)
router.post('/logout',logout);

module.exports = router