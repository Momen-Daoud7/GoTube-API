const express = require('express');
const multer = require('multer');
const  {
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
	getChannelPosts,
	uploadImage
} = require('../controllers/posts');

// middlewares
const { protect , authorize} = require('../middleware/auth')

// Validation
const {
	postValidationRules,
	postValidate
} = require('../validation/post');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/posts')
    },
    filename: (req, file, cb) => {
        cb(null, "IMG-" + Date.now() + path.extname(file.originalname))
    }
})

const image = multer({
	storage,
	fileFilter(req,file,cb) {
		console.log(file)
		if(!file.mimetype.startsWith('image')) {
			return req.status(400).json({success:false,message:"File should an image"});
		}
		cb(undefined,cb)
	}
})

router.use(protect)

router.get('/',authorize('user','admin'),getPosts);

router.get('/channel/:channelId',authorize('user','admin'),getChannelPosts);

router.get('/:id',authorize('user','admin'),getPost);

router.post('/create',authorize('user','admin'),postValidationRules(),postValidate,createPost);

router.post('/upload/:id',authorize('user','admin'),image.single('image'),uploadImage);

router.put('/update/:id',authorize('user','admin'),postValidationRules(),postValidate,updatePost);

router.delete('/delete/:id',authorize('user','admin'),deletePost);


module.exports = router;