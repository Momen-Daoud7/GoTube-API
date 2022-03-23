const asyncHandler = require('../middleware/async');
const channelServices = require('../services/channel.services');

//@desc		Get all channels
//@route	GET /api/v1/channels/
//@access	Private
exports.getChannels = asyncHandler(async(req,res,next) => {
	const channels = await channelServices.getChannels();
	res.status(200).json({success:true,data:channels});
})

//@desc		Get a single channel
//@route	GET /api/v1/channels/:id
//@access	Private
exports.getChannel = asyncHandler(async(req,res,next) => {
	const channel = await channelServices.getChannel(req.params.channelId);
	res.status(200).json({success:true,data:channel})
})

//@desc		Create new channel
//@route	POST /api/v1/channels/create
//@access	Private
exports.createChannel = asyncHandler(async(req,res,next) => {
	const channel = await channelServices.store(req.body);
	res.status(201).json({success:true,data:channel})
})

//@desc		Update a channel
//@route	PUT /api/v1/channels/update/:id
//@access	Private
exports.updateChannel = asyncHandler(async(req,res,next) => {
	const channel = await channelServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:channel});
})

//@desc		Delete channel
//@route	Delete /api/v1/channels/delete/:id
//@access	Public
exports.deleteChannel = asyncHandler(async(req,res,next) => {
	await channelServices.delete(req.params.id);
	res.status(200).json({success:true})
})