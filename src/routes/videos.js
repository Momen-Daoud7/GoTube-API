const express = require('express');
const multer = require('multer');
const  {
	getVideos,
	getVideo,
	createVideo,
	updateVideo,
	deleteVideo,
	uploadImage
} = require('../controllers/videos');

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {
	videoValidationRules,
	videoValidate
} = require('../validation/video');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/videos')
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

router.get('/',authorize('user','admin'),getVideos);

router.get('/:id',authorize('user','admin'),getVideo);

router.post('/create',authorize('user','admin'),videoValidationRules(),videoValidate,createVideo);

router.post('/upload/:id',authorize('user','admin'),image.single('image'),uploadImage);

router.put('/update/:id',authorize('user','admin'),videoValidationRules(),videoValidate,updateVideo);

router.delete('/delete/:id',authorize('user','admin'),deleteVideo);


module.exports = router;