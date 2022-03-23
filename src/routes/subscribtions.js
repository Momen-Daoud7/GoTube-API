const express = require('express');
const  {
	getSubscribtions,
	getUserSubscribtions,
	getSubscribtion,
	createSubscribtion,
	updateSubscribtion,
	deleteSubscribtion,
} = require('../controllers/subscribtions');

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {
	subscribtionValidationRules,
	subscribtionValidate
} = require('../validation/subscribtion');

const router = express.Router();


router.use(protect)

router.get('/channel/:channelId',authorize('user','admin'),getSubscribtions);

router.get('/user/:userId',authorize('user','admin'),getUserSubscribtions);

router.get('/:id',authorize('user','admin'),getSubscribtion);

router.post('/create',authorize('user','admin'),subscribtionValidationRules(),subscribtionValidate,createSubscribtion);

router.put('/update/:id',authorize('user','admin'),subscribtionValidationRules(),subscribtionValidate,updateSubscribtion);

router.delete('/delete/:id',authorize('user','admin'),deleteSubscribtion);


module.exports = router; 