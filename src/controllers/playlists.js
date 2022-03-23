const asyncHandler = require('../middleware/async');
const playlistServices = require('../services/playlist.services');
const channelServices = require('../services/channel.services');

//@desc		Get all Playlists
//@route	GET /api/v1/Playlists/all/channelId
//@access	Public
exports.getPlaylists = asyncHandler(async(req,res,next) => {
	const playlists = await playlistServices.getPlaylists(req.params.channelId);
	res.status(200).json({success:true,data:playlists});
})

//@desc		Get a single Playlist
//@route	GET /api/v1/Playlists/:id
//@access	Public
exports.getPlaylist = asyncHandler(async(req,res,next) => {
	const playlist = await playlistServices.getPlaylist(req.params.id);
	res.status(200).json({success:true,data:playlist})
})

//@desc		Create new Playlist
//@route	POST /api/v1/Playlists/create/
//@access	Private
exports.createPlaylist = asyncHandler(async(req,res,next) => {
	const isUserChannel = await channelServices.isUserChannel(req.user.id,req.body.channelId);
	if(!isUserChannel) {
		return res.status(403).json({success:false,message:"You're not the channel owner"});
	}
	const playlist = await playlistServices.store(req.body);
	res.status(201).json({success:true,data:playlist})
})

//@desc		Update a Playlist
//@route	PUT /api/v1/Playlists/update/:id
//@access	Private
exports.updatePlaylist = asyncHandler(async(req,res,next) => {
	const isUserChannel = await channelServices.isUserChannel(req.user.id,req.body.channelId);
	if(!isUserChannel) {
		return res.stauts(403).json("You can not access this route")
	}
	const Playlist = await playlistServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:Playlist});
})

//@desc		Delete Playlist
//@route	Delete /api/v1/Playlists/delete/:id
//@access	Public
exports.deletePlaylist = asyncHandler(async(req,res,next) => {
	await PlaylistServices.delete(req.params.id);
	res.status(200).json({success:true})
})