const asyncHandler = require('../middleware/async');
const subscribtionServices = require('../services/subscribtion.services');
const channelServices = require('../services/channel.services');

//@desc		Get all channel subscribtions
//@route	GET /api/v1/subscribtions/channel/:channelId
//@access	Public
exports.getSubscribtions = asyncHandler(async(req,res,next) => {
	const subscribtions = await subscribtionServices.getSubscribtions(req.params.channelId);
	res.status(200).json({success:true,data:subscribtions});
})

//@desc		Get all user subscribtions
//@route	GET /api/v1/subscribtions/user/:userId
//@access	Public
exports.getUserSubscribtions = asyncHandler(async(req,res,next) => {
	const subscribtions = await subscribtionServices.getUserSubscribtions(req.params.userId);
	res.status(200).json({success:true,data:subscribtions});
})


//@desc		Get a single subscribtion
//@route	GET /api/v1/subscribtions/:id
//@access	Public
exports.getSubscribtion = asyncHandler(async(req,res,next) => {
	const subscribtion = await subscribtionServices.getSubscribtion(req.params.id);
	res.status(200).json({success:true,data:subscribtion})
})

//@desc		Create new subscribtion
//@route	subscribtion /api/v1/subscribtions/create
//@access	Private
exports.createSubscribtion = asyncHandler(async(req,res,next) => {
	const isUserChannel = await channelServices.isUserChannel(req.user.id,req.body.channelId);
	if(isUserChannel) {
		return res.status(403).json({success:false,message:"You can not subscribe"});
	}
	req.body.userId = req.user.id;
	const subscribtion = await subscribtionServices.store(req.body);
	res.status(201).json({success:true,data:subscribtion})
})

//@desc		Update a subscribtion
//@route	PUT /api/v1/subscribtions/update/:id
//@access	Private
exports.updateSubscribtion = asyncHandler(async(req,res,next) => {
	const isUserChannel = await channelServices.isUserChannel(req.user.id,req.body.channelId);
	if(isUserChannel) {
		return res.status(403).json({success:false,message:"You can not subscribe"});
	}
	const subscribtion = await subscribtionServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:subscribtion});
})

//@desc		Delete subscribtion
//@route	Delete /api/v1/subscribtions/delete/:id
//@access	Private
exports.deleteSubscribtion = asyncHandler(async(req,res,next) => {
	await subscribtionServices.delete(req.params.id);
	res.status(200).json({success:true})
})