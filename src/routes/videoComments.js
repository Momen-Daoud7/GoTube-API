const express = require('express');
const  {
	getVideoComments,
	getVideoComment,
	createVideoComment,
	updateVideoComment,
	deleteVideoComment,
} = require('../controllers/videoComments');

// middlewares
const { protect,authorize } = require('../middleware/auth')

// Validation
const {
	videoCommentValidationRules,
	videoCommentValidate
} = require('../validation/videoComment');

const router = express.Router();


router.use(protect)

router.get('/video/:videoId',authorize('admin','user'),getVideoComments);

router.get('/:id',authorize('admin','user'),getVideoComment);

router.post('/create',authorize('admin','user'),videoCommentValidationRules(),videoCommentValidate,createVideoComment);

router.put('/update/:id',authorize('admin','user'),videoCommentValidationRules(),videoCommentValidate,updateVideoComment);

router.delete('/delete/:id',authorize('admin','user'),deleteVideoComment);


module.exports = router;