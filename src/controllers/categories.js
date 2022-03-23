const asyncHandler = require('../middleware/async');
const categoryServices = require('../services/category.services');

//@desc		Get all categories
//@route	GET /api/v1/categries/
//@access	Private
exports.getCategories = asyncHandler(async(req,res,next) => {
	const categories = await categoryServices.getCategories();
	res.status(200).json({success:true,data:categories});
})

//@desc		Get a single category
//@route	GET /api/v1/categries/:id
//@access	Private
exports.getCategory = asyncHandler(async(req,res,next) => {
	const category = await categoryServices.getCategory(req.params.categoryId);
	res.status(200).json({success:true,data:category})
})

//@desc		Create new category
//@route	POST /api/v1/categries/create
//@access	Private
exports.createCategory = asyncHandler(async(req,res,next) => {
	const category = await categoryServices.store(req.body);
	res.status(201).json({success:true,data:category})
})

//@desc		Update a category
//@route	PUT /api/v1/categries/update/:id
//@access	Private
exports.updateCategory = asyncHandler(async(req,res,next) => {
	const category = await categoryServices.update(req.params.id,req.body);
	res.status(200).json({success:true,data:category});
})

//@desc		Delete category
//@route	Delete /api/v1/categries/delete/:id
//@access	Public
exports.deleteCategory = asyncHandler(async(req,res,next) => {
	await categoryServices.delete(req.params.id);
	res.status(200).json({success:true})
})