const asyncHandler = require('../middleware/async');
const videoCommentServices = require('../services/videoComment.services');

//@desc		Get all videoComments
//@route	GET /api/v1/videoComments/:videoId
//@access	Public
exports.getVideoComments = asyncHandler(async(req,res,next) => {
	const videoComments = await videoCommentServices.getVideoComments(req.params.videoId);
	res.status(200).json({success:true,data:videoComments});
})

//@desc		Get a single videoComment
//@route	GET /api/v1/videoComments/:id
//@access	Public
exports.getVideoComment = asyncHandler(async(req,res,next) => {
	const videoComment = await videoCommentServices.getVideoComment(req.params.id);
	res.status(200).json({success:true,data:videoComment})
})

//@desc		Create new videoComment
//@route	POST /api/v1/videoComments/create
//@access	Private
exports.createVideoComment = asyncHandler(async(req,res,next) => {
	req.body.userId = req.user.id;
	const videoComment = await videoCommentServices.store(req.body);
	res.status(201).json({success:true,data:videoComment})
})

//@desc		Update a videoComment
//@route	PUT /api/v1/videoComments/update/:id
//@access	Private
exports.updateVideoComment = asyncHandler(async(req,res,next) => {
	const comment = videoCommentServices.getVideoComment(req.params.id);
	if(comment.userId === req.user.id) {
		return res.status(400).json({success:false,message:"You can not access this route"});
	}
	const videoComment = await videoCommentServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:videoComment});
})

//@desc		Delete videoComment
//@route	Delete /api/v1/videoComments/delete/:id
//@access	Private
exports.deleteVideoComment = asyncHandler(async(req,res,next) => {
	await videoCommentServices.delete(req.params.id);
	res.status(200).json({success:true})
})