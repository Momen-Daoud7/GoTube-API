const express = require('express');
const  {
	getPostComments,
	getPostComment,
	createPostComment,
	updatePostComment,
	deletePostComment,
} = require('../controllers/postComments');

// middlewares
const { protect,authorize } = require('../middleware/auth')

// Validation
const {
	postCommentValidationRules,
	postCommentValidate
} = require('../validation/postComment');

const router = express.Router();


router.use(protect)

router.get('/post/:postId',authorize('user','admin'),getPostComments);

router.get('/:id',authorize('user','admin'),getPostComment);

router.post('/create',authorize('user','admin'),postCommentValidationRules(),postCommentValidate,createPostComment);

router.put('/update/:id',authorize('user','admin'),postCommentValidationRules(),postCommentValidate,updatePostComment);

router.delete('/delete/:id',authorize('user','admin'),deletePostComment);


module.exports = router;