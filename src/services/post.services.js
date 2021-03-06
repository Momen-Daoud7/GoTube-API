const Post = require('../models/7-post');

module.exports = class PostServices {
	// get all posts
	static async getPosts() {
		try{
			const posts = await Post.findAll();
			return posts;
		}catch(error) {
			console.log(error);
		}
	}

	// get all channel posts
	static async getChannelPosts(channelId) {
		try{
			const posts = await Post.findAll({where:{channelId:channelId}});
			return posts;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Post
	static async store(data) {
		try{
			const post = await Post.create(data);
			return post;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Post
	static async update(PostId,data) {
		try{
			const oldPost = await Post.findByPk(PostId)
			if(!oldPost) {
				return  false;
			}
			const updatedPost = await oldPost.update(data);
			return updatedPost;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Post
	static async delete(PostId) {
		try{
			const post = await Post.findByPk(PostId);
			if(!post) {
				return false;
			}
			const deleted = await post.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Post
	static async getPost(PostId) {
		try{
			const post = await Post.findByPk(PostId);
			if(!post) {
				console.log('no Post with that id');
				return false;
			}
			return post;
		}catch(error) {
			console.log(error);
		}
	}

	
}