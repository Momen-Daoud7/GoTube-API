const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
	name: {
		type: String,
		required:[true,"Name is required."]
	},
	description: {
		type: String
	},
	channel: {
		type:Schema.Types.ObjectId,
		ref:'channel'
	}
});

const Playlist = mongoose.model('playlist',PlaylistSchema);

module.exports = Playlist;