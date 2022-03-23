const {body , validationResult} = require('express-validator');

// create validation rules
exports.categoryValidationRules = () => {
	return [
		body('name',"please add a valid name").isLength({min:3}),
	];
};


// check if there're errors
exports.categoryValidate = (req,res,next) => {
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

