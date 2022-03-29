const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref:'user',
		required:[true,"User is required"]
	},
	post: {
		type: Schema.Types.ObjectId,
		ref:'post',
	},
	video: {
		type: Schema.Types.ObjectId,
		ref:'video'
	}
});

const Like = mongoose.model('like',LikeSchema);

module.exports = Like;