const asyncHandler = require('../middleware/async');
const postServices = require('../services/post.services');
const channelServices = require('../services/channel.services');

//@desc		Get all posts
//@route	GET /api/v1/posts/
//@access	Public
exports.getPosts = asyncHandler(async(req,res,next) => {
	const posts = await postServices.getPosts();
	res.status(200).json({success:true,data:posts});
})

//@desc		Get all channel posts
//@route	GET /api/v1/posts/channel/:channelId
//@access	Public
exports.getChannelPosts = asyncHandler(async(req,res,next) => {
	const posts = await postServices.getChannelPosts(req.params.channelId);
	res.status(200).json({success:true,data:posts});
})

//@desc		Get a single post
//@route	GET /api/v1/posts/:id
//@access	Public
exports.getPost = asyncHandler(async(req,res,next) => {
	const post = await postServices.getPost(req.params.id);
	res.status(200).json({success:true,data:post})
})

//@desc		Create new post
//@route	POST /api/v1/posts/create
//@access	Private
exports.createPost = asyncHandler(async(req,res,next) => {
	const isUserChannel = await channelServices.isUserChannel(req.user.id,req.body.channelId);
	if(!isUserChannel) {
		return res.stauts(403).json("You can not access this route")
	}
	const post = await postServices.store(req.body);
	res.status(201).json({success:true,data:post})
})

//@desc		Update a post
//@route	PUT /api/v1/posts/update/:id
//@access	Private
exports.updatePost = asyncHandler(async(req,res,next) => {
	const isUserChannel = await channelServices.isUserChannel(req.user.id,req.body.channelId);
	if(!isUserChannel) {
		return res.status(403).json({success:false,message:"You can not access this route"})
	}
	const post = await postServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:post});
})

//@desc		Delete post
//@route	Delete /api/v1/posts/delete/:id
//@access	Private
exports.deletePost = asyncHandler(async(req,res,next) => {
	const isUserChannel = await channelServices.isUserChannel(req.user.id,req.body.channelId);
	if(!isUserChannel) {
		return res.status(403).json({success:false,message:"You can not access this route"})
	}
	await postServices.delete(req.params.id);
	res.status(200).json({success:true})
})

//@desc		Upload post image
//@route	Delete /api/v1/posts/upload/:id
//@access	Private
exports.uploadImage = asyncHandler(async(req,res,next) => {
	const post = await postServices.update(req.params.id,{image:req.file.filename})
	res.status(200).json({success:true})
})