const express = require('express');
const  {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');

// middlewares
const { protect , authorize} = require('../middleware/auth')

// Validation
const {
	userValidationRules,
	userValidate,
} = require('../validation/user');

const router = express.Router();


router.use(protect)

router.get('/',authorize('admin'),getUsers);

router.get('/:userId',authorize('admin'),getUser);

router.post('/create',authorize('admin'),userValidationRules(),userValidate,createUser);

router.put('/update/:userId',authorize('admin'),updateUser);

router.delete('/delete/:userId',authorize('admin'),deleteUser);


module.exports = router;