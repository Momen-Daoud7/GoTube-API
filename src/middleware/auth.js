const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHanlder = require('../middleware/async');
const User = require('../models/1-user');

// proteced route
exports.protect = asyncHanlder(async(req,res,next) => {
	let token;

	if(
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	  ) {
		token = req.headers.authorization.split(' ')[1];
	}

	// else if(req.cookies.token) {
	// 	token = req.cookies.token
	// }

	// make sure token exsits
	if(!token) {
		return next(new ErrorResponse(`No authorize access to this route `,401));
	}

	try {
		// verify token
		const decode = await jwt.verify(token,process.env.JWT_SECRET);
		
		req.user =  await User.findByPk(decode.id);

		next()

	}catch(err) {
		return next(new ErrorResponse(`No authorize access to this route `,401));
	}
});

// Grant access to roles
exports.authorize = (...roles) => {
	return (req,res,next) => {
		if(!roles.includes(req.user.role)) {
			return next(new ErrorResponse(`User role ${req.user.role} is not authorize to access this route `,403));
		}
		next();
	}
}