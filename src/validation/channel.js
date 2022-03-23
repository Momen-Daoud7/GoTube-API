const {body , validationResult} = require('express-validator');

// create validation rules
exports.channelValidationRules = () => {
	return [
		body('name',"please add a valid name").isLength({min:3}),
		body('description',"please add a vaild description").isLength({min:10}).isString(),
		body('categoryId',"please add a vaild category").isNumeric()
	];
};


// check if there're errors
exports.channelValidate = (req,res,next) => {
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

