const express = require('express');
const  {
	getVideoLikes,
	getPostLikes,
	getLike,
	createLike,
	updateLike,
	deleteLike,
} = require('../controllers/likes');

// middlewares
const { protect,authorize } = require('../middleware/auth')

const router = express.Router();


router.use(protect)

router.get('/video/:videoId',authorize('user','admin'),getVideoLikes);

router.get('/post/:postId',authorize('user','admin'),getPostLikes);

router.get('/:id',authorize('user','admin'),getLike);

router.post('/create',authorize('user','admin'),createLike);

router.put('/update/:id',authorize('user','admin'),updateLike);

router.delete('/delete/:id',authorize('user','admin'),deleteLike);

module.exports = router;