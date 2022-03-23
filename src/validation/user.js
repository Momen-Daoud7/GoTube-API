const {body , validationResult} = require('express-validator');
const User = require('../models/1-user');


// create validation rules
exports.userValidationRules = () => {
	return [
		body('name',"please add a valid name").isLength({min:3}),
		body('email',"please add a valid email").isEmail(),
		body('password','password should be at leaest 8 charactor').trim().isLength({min: 6}),
		body('passwordConfirm','password don not match').custom(async(value,{req}) => {
			if(value === req.body.password) {
				return true
			}
			return Promise.reject('password do not match')
		})
	];
};


// check if there're errors
exports.userValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	res.status(400).json({
		success:true,
		errors: errors.array()
	})
}

