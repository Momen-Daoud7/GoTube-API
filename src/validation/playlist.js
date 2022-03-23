const {body , validationResult} = require('express-validator');

// create validation rules
exports.playlistValidationRules = () => {
	return [
		body('name',"please add a valid name").isLength({min:3}),
		body('channelId',"please add a valid channelId").isNumeric(),
		body('description',"please add a valid description").isLength({min:10}),
	];
};


// check if there're errors
exports.playlistValidate = (req,res,next) => {
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

