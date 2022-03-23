const express = require('express');
const  {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categories');

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {
	categoryValidationRules,
	categoryValidate,
} = require('../validation/category');

const router = express.Router();


router.use(protect)

router.get('/',authorize('user','admin'),getCategories);

router.get('/:id',authorize('user','admin'),getCategory);

router.post('/create',authorize('admin'),categoryValidationRules(),categoryValidate,createCategory);

router.put('/update/:id',authorize('admin'),categoryValidationRules(),categoryValidate,updateCategory);

router.delete('/delete/:id',authorize('admin'),deleteCategory);


module.exports = router;