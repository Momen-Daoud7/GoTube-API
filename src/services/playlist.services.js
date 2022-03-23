const Playlist = require('../models/4-playlist');

module.exports = class PlaylistServices {
	// get all Playlists
	static async getPlaylists(channelId) {
		try{
			const playlists = await Playlist.findAll({where:{channelId}});
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
			const oldPlaylist = await Playlist.findByPk(PlaylistId)
			if(!oldPlaylist) {
				return  false;
			}
			const updatedPlaylist = await oldPlaylist.update(data);
			return updatedPlaylist;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Playlist
	static async delete(PlaylistId) {
		try{
			const playlist = await Playlist.findByPk(PlaylistId);
			if(!playlist) {
				return false;
			}
			const deleted = await playlist.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Playlist
	static async getPlaylist(PlaylistId) {
		try{
			const playlist = await Playlist.findByPk(PlaylistId,{include:{all:true}});
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