const Category = require('../models/2-category');

module.exports = class categoryServices {
	// get all categories
	static async getCategories() {
		try{
			const categories = await Category.find({});
			return categories;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Category
	static async store(data) {
		try{
			const category = await Category.create(data);
			return category;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Category
	static async update(categoryId,data) {
		try{
			const oldCategory = await Category.findById(categoryId)
			if(!oldCategory) {
				return  false;
			}
			const updatedCategory = await Category.findByIdAndUpdate(categoryId,data,{
				new:true,
				runValidators:true
			});
			return updatedCategory;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Category
	static async delete(CategoryId) {
		try{
			const category = await Category.findById(CategoryId);
			if(!category) {
				return false;
			}
			const deleted = await category.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Category
	static async getCategory(CategoryId) {
		try{
			const category = await Category.findById(CategoryId);
			if(!category) {
				console.log('no Category with that id');
				return false;
			}
			return category;
		}catch(error) {
			console.log(error);
		}
	}

	
}