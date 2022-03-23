const PostComment = require('../models/8-postComment');

module.exports = class PostCommentServices {
	// get all categories
	static async getPostComments(postId) {
		try{
			const postComments = await PostComment.findAll({where:{postId}});
			return postComments;
		}catch(error) {
			console.log(error);
		}
	}

	//store a PostComment
	static async store(data) {
		try{
			const postComment = await PostComment.create(data);
			return postComment;
		}catch(error) {
			console.log(error);
		}
	}

	// update a PostComment
	static async update(PostCommentId,data) {
		try{
			const oldPostComment = await PostComment.findByPk(PostCommentId)
			if(!oldPostComment) {
				return  false;
			}
			const updatedPostComment = await oldPostComment.update(data);
			return updatedPostComment;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a PostComment
	static async delete(PostCommentId) {
		try{
			const postComment = await PostComment.findByPk(PostCommentId);
			if(!postComment) {
				return false;
			}
			const deleted = await postComment.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single PostComment
	static async getPostComment(PostCommentId) {
		try{
			const postComment = await PostComment.findByPk(PostCommentId);
			if(!postComment) {
				console.log('no PostComment with that id');
				return false;
			}
			return postComment;
		}catch(error) {
			console.log(error);
		}
	}

	
}