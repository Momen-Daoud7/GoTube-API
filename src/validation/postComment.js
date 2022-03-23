const {body , validationResult} = require('express-validator');

// create validation rules
exports.postCommentValidationRules = () => {
	return [
		body('content',"please add a valid content").isLength({min:3}),
		body("postId",'please add a valid channelId').isNumeric()
	];
};


// check if there're errors
exports.postCommentValidate = (req,res,next) => {
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

