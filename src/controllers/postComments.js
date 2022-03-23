const asyncHandler = require('../middleware/async');
const postCommentServices = require('../services/postComment.services');

//@desc		Get all postComments
//@route	GET /api/v1/postComments/post/:postId
//@access	Public
exports.getPostComments = asyncHandler(async(req,res,next) => {
	const postComments = await postCommentServices.getPostComments(req.params.postId);
	res.status(200).json({success:true,data:postComments});
})

//@desc		Get a single postComment
//@route	GET /api/v1/postComments/:id
//@access	Public
exports.getPostComment = asyncHandler(async(req,res,next) => {
	const postComment = await postCommentServices.getPostComment(req.params.id);
	res.status(200).json({success:true,data:postComment})
})

//@desc		Create new postComment
//@route	POSTComment /api/v1/postComments/create
//@access	Private
exports.createPostComment = asyncHandler(async(req,res,next) => {
	req.body.userId = req.user.id;
	const postComment = await postCommentServices.store(req.body);
	res.status(201).json({success:true,data:postComment})
})

//@desc		Update a postComment
//@route	PUT /api/v1/postComments/update/:id
//@access	Private
exports.updatePostComment = asyncHandler(async(req,res,next) => {
	const comment = postCommentServices.getPostComment(req.params.id);
	if(comment.userId === req.user.id) {
		return res.status(400).json({success:false,message:"You can not access this route"});
	}
	const postComment = await postCommentServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:postComment});
})

//@desc		Delete postComment
//@route	Delete /api/v1/postComments/delete/:id
//@access	Private
exports.deletePostComment = asyncHandler(async(req,res,next) => {
	await postCommentServices.delete(req.params.id);
	res.status(200).json({success:true})
})