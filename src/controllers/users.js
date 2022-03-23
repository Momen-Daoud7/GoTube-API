const asyncHandler = require('../middleware/async');
const userServices = require('../services/user.services');

//@desc		Get all users
//@route	GET /api/v1/users/
//@access	Private
exports.getUsers = asyncHandler(async(req,res,next) => {
	const users = await userServices.getUsers();
	res.status(200).json({success:true,data:users});
})

//@desc		Get a single user
//@route	GET /api/v1/users/:id
//@access	Private
exports.getUser = asyncHandler(async(req,res,next) => {
	const user = await userServices.getUser(req.params.userId);
	res.status(200).json({success:true,data:user})
})

//@desc		Create new user
//@route	POST /api/v1/users/create
//@access	Private
exports.createUser = asyncHandler(async(req,res,next) => {
	const user = await userServices.store(req.body);
	res.status(201).json({success:true,data:user})
})

//@desc		Update a user
//@route	PUT /api/v1/users/update/:id
//@access	Private
exports.updateUser = asyncHandler(async(req,res,next) => {
	// check if the user update his password
	if(req.body.password) {
		//hash the passowrd and create new user
		const hasedPassword = await bcrypt.hash(req.body.password,12);
		req.body.password = hasedPassword;
	}

	const user = await userServices.update(req.params.userId,req.body);
	res.status(200).json({success:true,data:user});
})

//@desc		Delete user
//@route	Delete /api/v1/users/delete/:id
//@access	Public
exports.deleteUser = asyncHandler(async(req,res,next) => {
	await userServices.delete(req.params.userId);
	res.status(200).json({success:true})
})