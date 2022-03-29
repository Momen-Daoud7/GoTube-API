const Playlist = require('../models/4-playlist');

module.exports = class PlaylistServices {
	// get all Playlists
	static async getPlaylists(channelId) {
		try{
			const playlists = await Playlist.find({channel:channelId});
			return playlists;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Playlist
	static async store(data) {
		try{
			const playlist = await Playlist.create(data);
			return playlist;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Playlist
	static async update(PlaylistId,data) {
		try{
			const oldPlaylist = await Playlist.findById(PlaylistId)
			if(!oldPlaylist) {
				return  false;
			}
			const updatedPlaylist = await Playlist.findByIdAndUpdate(PlaylistId,data, {
				new:true,
				runValidators:true
			});
			return updatedPlaylist;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Playlist
	static async delete(PlaylistId) {
		try{
			const playlist = await Playlist.findById(PlaylistId);
			if(!playlist) {
				return false;
			}
			const deleted = await playlist.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Playlist
	static async getPlaylist(PlaylistId) {
		try{
			const playlist = await Playlist.findById(PlaylistId);
			if(!playlist) {
				console.log('no Playlist with that id');
				return false;
			}
			return playlist;
		}catch(error) {
			console.log(error);
		}
	}
}