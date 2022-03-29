const Like = require('../models/901-Like');

module.exports = class LikeServices {
	// get video Likes
	static async getVideoLikes(videoId) {
		try {	
			const likes = Like.find({video:videoId});
			return likes;
		}catch(error) {	
			console.log(error)
		}
	}

	// get video Likes
	static async getPostLikes(postId) {
		try {	
			const likes = Like.find({post:postId});
			return likes;
		}catch(error) {	
			console.log(error)
		}
	}

	//store a Like
	static async store(data) {
		try{
			const like = await Like.create(data);
			return like;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Like
	static async update(LikeId,data) {
		try{
			const oldLike = await Like.findById(LikeId)
			if(!oldLike) {
				return  false;
			}
			const updatedLike = await Like.findByIdAndUpdate(LikeId,data,{
				new:true,
				runvalidators:true
			});
			return updatedLike;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Like
	static async delete(LikeId) {
		try{
			const like = await Like.findById(LikeId);
			if(!like) {
				return false;
			}
			await like.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Like
	static async getLike(LikeId) {
		try{
			const like = await Like.findById(LikeId);
			if(!like) {
				console.log('no Like with that id');
				return false;
			}
			return like;
		}catch(error) {
			console.log(error);
		}
	}

	
}