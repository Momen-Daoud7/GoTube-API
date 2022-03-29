const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const ChannelSchema = new Schema({
	name: {
		type: String,
		required:[true,"Name is required"]
	},
	description:{ 
		type: String,
		required:[true,"Description is required"]
	},
	image: {
		type: String,
	},
	user: {
		type:Schema.Types.ObjectId,
		ref:'user',
		required:[true,"User is required"]
	},
	category: {
		type:Schema.Types.ObjectId,
		ref:'category',
		required:[true,"Category is required."]
	},
	playlists:[{
		type: Schema.Types.ObjectId,
		ref:'playlists'
	}]
});


const Channel = mongoose.model('channel',ChannelSchema);

module.exports = Channel;