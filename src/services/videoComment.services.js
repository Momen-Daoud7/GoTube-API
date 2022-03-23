const VideoComment = require('../models/6-VideoComment');

module.exports = class VideoCommentServices {
	// get all VideoComments
	static async getVideoComments(videoId) {
		try{
			const videoComments = await VideoComment.findAll({where:{videoId},include:{all:true}});
			return videoComments;
		}catch(error) {
			console.log(error);
		}
	}

	//store a VideoComment
	static async store(data) {
		try{
			const videoComment = await VideoComment.create(data);
			return videoComment;
		}catch(error) {
			console.log(error);
		}
	}

	// update a VideoComment
	static async update(videoCommentId,data) {
		try{
			const oldVideoComment = await VideoComment.findByPk(videoCommentId)
			if(!oldVideoComment) {
				return  false;
			}
			const updatedVideoComment = await oldVideoComment.update(data);
			return updatedVideoComment;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a VideoComment
	static async delete(VideoCommentId) {
		try{
			const videoComment = await VideoComment.findByPk(VideoCommentId);
			if(!videoComment) {
				return false;
			}
			const deleted = await videoComment.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single VideoComment
	static async getVideoComment(VideoCommentId) {
		try{
			const videoComment = await VideoComment.findByPk(VideoCommentId);
			if(!videoComment) {
				console.log('no VideoComment with that id');
				return false;
			}
			return videoComment;
		}catch(error) {
			console.log(error);
		}
	}

	
}