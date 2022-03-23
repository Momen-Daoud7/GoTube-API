const ErrorResponse = require('../utils/errorResponse')

const errorHanlder = (err,req,res,next) => {
	let error = {...err}

	error.message = err.message

	// write to the error to console for dev
	console.log(err);

	// Cast error
	if(err.name = 'CastError') {
		const message = `Resource doest'nt found with this id ${err.value}`
		error = new ErrorResponse(message,404)
	}

	// duplicate key
	if(err.name === 'SequelizeUniqueConstraintError') {
		const message = 'duplicate filed value entered'
		error = new ErrorResponse(message,400)
	}

	// Validation errror
	if(err.name == 'Validation error') {
		const message = Object.values(err.errors).map(val => val.message)
		console.log('jh')
		error = new ErrorResponse(message,400)
	}



	res.status(err.statusCode || 500).json({
		success:false,
		msg: err.message || "Server Error"
	});
}

module.exports = errorHanlder