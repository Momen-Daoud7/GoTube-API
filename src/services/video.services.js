const Video = require('../models/5-video');

module.exports = class VideoServices {
	// get all categories
	static async getVideos() {
		try{
			const videos = await Video.find({});
			return videos;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Video
	static async store(data) {
		try{
			const video = await Video.create(data);
			return video;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Video
	static async update(VideoId,data) {
		try{
			const oldVideo = await Video.findById(VideoId)
			if(!oldVideo) {
				return  false;
			}
			const updatedVideo = await Video.findByIdAndUpdate(VideoId,data,{
				new:true,
				runValidators:true
			});
			return updatedVideo;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Video
	static async delete(VideoId) {
		try{
			const video = await Video.findById(VideoId);
			if(!video) {
				return false;
			}
			const deleted = await video.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Video
	static async getVideo(VideoId) {
		try{
			const video = await Video.findById(VideoId);
			if(!video) {
				console.log('no Video with that id');
				return false;
			}
			return video;
		}catch(error) {
			console.log(error);
		}
	}
}