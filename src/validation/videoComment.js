const {body , validationResult} = require('express-validator');

// create validation rules
exports.videoCommentValidationRules = () => {
	return [
		body('comment',"please add a valid title").isLength({min:3}),
		body('videoId',"please add a valid videoId").isNumeric(),
		body('userId',"please add a valid userId").isNumeric(),
	];
};


// check if there're errors
exports.videoCommentValidate = (req,res,next) => {
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

