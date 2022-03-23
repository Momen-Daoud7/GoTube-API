const {body , validationResult} = require('express-validator');

// create validation rules
exports.videoValidationRules = () => {
	return [
		body('title',"please add a valid title").isLength({min:3}),
		body('description',"please add a valid description").isLength({min:10}),
		body('channelId',"please add a valid channelId").isNumeric(),
	];
};


// check if there're errors
exports.videoValidate = (req,res,next) => {
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

