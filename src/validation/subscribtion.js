const {body , validationResult} = require('express-validator');

// create validation rules
exports.subscribtionValidationRules = () => {
	return [
		body('channelId',"please add a valid channelId").isNumeric(),
	];
};


// check if there're errors
exports.subscribtionValidate = (req,res,next) => {
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

