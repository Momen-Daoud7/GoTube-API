const asyncHandler = require('../middleware/async');
const likeServices = require('../services/like.services');

//@desc		Get all video's likes
//@route	GET /api/v1/likes/video/:videoId
//@access	Public
exports.getVideoLikes = asyncHandler(async(req,res,next) => {
	const likes = await likeServices.getVideoLikes(req.params.videoId);
	res.status(200).json({success:true,data:likes});
})

//@desc		Get all post's likes
//@route	GET /api/v1/likes/post/:postId
//@access	Public
exports.getPostLikes = asyncHandler(async(req,res,next) => {
	const likes = await likeServices.getPostLikes(req.params.postId);
	res.status(200).json({success:true,data:likes});
})

//@desc		Get a single like
//@route	GET /api/v1/likes/:id
//@access	Public
exports.getLike = asyncHandler(async(req,res,next) => {
	const like = await likeServices.getLike(req.params.id);
	res.status(200).json({success:true,data:like})
})

//@desc		Create new like
//@route	like /api/v1/likes/create
//@access	Private
exports.createLike = asyncHandler(async(req,res,next) => {
	const like = await likeServices.store(req.body);
	res.status(201).json({success:true,data:like})
})

//@desc		Update a like
//@route	PUT /api/v1/likes/update/:id
//@access	Private
exports.updateLike = asyncHandler(async(req,res,next) => {
	const like = await likeServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:like});
})

//@desc		Delete like
//@route	Delete /api/v1/likes/delete/:id
//@access	Private
exports.deleteLike = asyncHandler(async(req,res,next) => {
	await likeServices.delete(req.params.id);
	res.status(200).json({success:true})
})
