const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	content: {
		type: String,
		required:[true,"Content is required."]
	},
	image: {
		type: String
	},
	channel: {
		type: Schema.Types.ObjectId,
		ref:'channel',
		required:[true,"Channel is required."]
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref:'postcomments'
	}]
});

const Post = mongoose.model('post',PostSchema);

module.exports = Post;
