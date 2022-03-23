const asyncHandler = require('../middleware/async');
const videoServices = require('../services/video.services');

//@desc		Get all videos
//@route	GET /api/v1/videos/
//@access	Public
exports.getVideos = asyncHandler(async(req,res,next) => {
	const videos = await videoServices.getVideos();
	res.status(200).json({success:true,data:videos});
})

//@desc		Get a single video
//@route	GET /api/v1/videos/:id
//@access	Public
exports.getVideo = asyncHandler(async(req,res,next) => {
	const video = await videoServices.getVideo(req.params.id);
	res.status(200).json({success:true,data:video})
})

//@desc		Create new video
//@route	POST /api/v1/videos/create
//@access	Private
exports.createVideo = asyncHandler(async(req,res,next) => {
	const video = await videoServices.store(req.body);
	res.status(201).json({success:true,data:video})
})

//@desc		Update a video
//@route	PUT /api/v1/videos/update/:id
//@access	Private
exports.updateVideo = asyncHandler(async(req,res,next) => {
	const video = await videoServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:video});
})

//@desc		Delete video
//@route	Delete /api/v1/videos/delete/:id
//@access	Private
exports.deleteVideo = asyncHandler(async(req,res,next) => {
	await videoServices.delete(req.params.id);
	res.status(200).json({success:true})
})

//@desc		Upload post image
//@route	Delete /api/v1/videos/upload/:id
//@access	Private
exports.uploadImage = asyncHandler(async(req,res,next) => {
	const video = await videoServices.update(req.params.id,{image:req.file.filename})
	res.status(200).json({success:true})
})