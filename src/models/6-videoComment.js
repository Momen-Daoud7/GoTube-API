const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoCommentSchema = new Schema({
	comment: {
		type:String,
		required:[true,"Comment is required"]
	},
	user: {
		type: Schema.Types.ObjectId,
		ref:'user',
		required:[true,"User is required"]
	},
	video: {
		type: Schema.Types.ObjectId,
		ref:'video',
		required:[true,"Video is required"]
	}
});

const VideoComment = mongoose.model('videocomment',VideoCommentSchema);


module.exports = VideoComment;