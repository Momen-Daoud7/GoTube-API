const {body , validationResult} = require('express-validator');

// create validation rules
exports.postValidationRules = () => {
	return [
		body('content',"please add a valid content").isLength({min:3}),
		body("channelId",'please add a valid channelId').isNumeric()
	];
};


// check if there're errors
exports.postValidate = (req,res,next) => {
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

