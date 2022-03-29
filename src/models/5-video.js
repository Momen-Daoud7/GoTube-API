const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
	title: {
		type: String,
		required:[true,"Title is required."]
	},
	description: {
		type: String
	},
	image: {
		type: String,
	},
	channel: {
		type: Schema.Types.ObjectId,
		ref:'channel',
		required:[true,"Channel is required"]
	},
	playlist: {
		type: Schema.Types.ObjectId,
		ref:"playlist"
	},
	comments:[{
		type: Schema.Types.ObjectId,
		ref:'videocomments'
	}]
});

const Video = mongoose.model('video',VideoSchema);

module.exports = Video;