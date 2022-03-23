const express = require('express');
const  {
	getPlaylists,
	getPlaylist,
	createPlaylist,
	updatePlaylist,
	deletePlaylist,
} = require('../controllers/playlists');

// middlewares
const { protect,authorize } = require('../middleware/auth')

// Validation
const {
	playlistValidationRules,
	playlistValidate
} = require('../validation/playlist');

const router = express.Router();


router.use(protect)

router.get('/all/:channelId',authorize('user','admin'),getPlaylists);

router.get('/:id',authorize('user','admin'),getPlaylist);

router.post('/create',authorize('user','admin'),playlistValidationRules(),playlistValidate,createPlaylist);

router.put('/update/:id',authorize('user','admin'),playlistValidationRules(),playlistValidate,updatePlaylist);

router.delete('/delete/:id',authorize('user','admin'),deletePlaylist);


module.exports = router;