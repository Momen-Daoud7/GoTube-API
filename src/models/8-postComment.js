const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostCommentSchema = new Schema({
	content: {
		type:String,
		required:[true,"Content is required"]
	},
	post:{
		type: Schema.Types.ObjectId,
		ref:'post',
		required:[true,"Post is required"]
	}
})

const PostComment = mongoose.model('postcomment',PostCommentSchema);

module.exports = PostComment;