const express = require('express');
const  {
	getChannels,
	getChannel,
	createChannel,
	updateChannel,
	deleteChannel,
} = require('../controllers/channels');

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {
	channelValidationRules,
	channelValidate
} = require('../validation/channel');

const router = express.Router();


router.use(protect)

router.get('/',authorize('user','admin'),getChannels);

router.get('/:id',authorize('user','admin'),getChannel);

router.post('/create',authorize('admin'),channelValidationRules(),channelValidate,createChannel);

router.put('/update/:id',authorize('admin'),channelValidationRules(),channelValidate,updateChannel);

router.delete('/delete/:id',authorize('admin'),deleteChannel);


module.exports = router;