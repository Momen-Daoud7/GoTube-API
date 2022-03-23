const Category = require('../models/2-category');

module.exports = class categoryServices {
	// get all categories
	static async getCategories() {
		try{
			const categories = await Category.findAll();
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
			const oldCategory = await Category.findByPk(categoryId)
			if(!oldCategory) {
				return  false;
			}
			const updatedCategory = await oldCategory.update(data);
			return updatedCategory;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Category
	static async delete(CategoryId) {
		try{
			const category = await Category.findByPk(CategoryId);
			if(!category) {
				return false;
			}
			const deleted = await category.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Category
	static async getCategory(CategoryId) {
		try{
			const category = await Category.findByPk(CategoryId);
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