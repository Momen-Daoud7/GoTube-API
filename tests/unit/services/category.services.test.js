const categorieServices = require('../../../src/services/category.services')
const Category = require('../../../src/models/2-category');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database();
})

let category1,category2;
beforeEach(async () => {
	await Category.deleteMany({})

	category1 = new Category({name:"Music"})
	category2 = new Category({ name:"computer"})

	await category1.save();
	await category2.save();
})

describe('category services tests', () => {

	it("Should return all categories",async () => {
		const categories = await categorieServices.getCategories();
		expect(categories).toEqual(expect.any(Array));
		expect(categories[0].name).toBe('Music')
		expect(categories[1].name).toBe("computer")
	})

	describe('test getcategory functionallity', () => {

		it("Should get a single category", async () => {
			const category = await categorieServices.getCategory(category1._id);
			expect(category.name).toBe('Music')
		})

		it("Should return false or undefined when category is not exists", async () => {
			const category = await categorieServices.getCategory(282);
			expect(category).toBe(undefined)
		})
	})

	it("should create new category",async () => {
		const data = { name:"sports"}
		const category = await categorieServices.store(data)
		expect(category.name).toBe(data.name)
	})

	describe("Test update category functionallity",() => {

		it("Should update a category details",async () => {
			const data = {name: "John Do"}
			const category = await categorieServices.update(category1._id,data)
			expect(category.name).toBe(data.name)
		})

		it("Should return false or undefined when updateing unexiting category",async () => {
			const data = {name: "John Do"}
			const category = await categorieServices.update(11,data)
			expect(category).toBe(undefined)
		})
	})


	describe("Test delete category functionallity",() => {

		it("Should delete a category",async () => {
			const category = await categorieServices.delete(category1._id)
			expect(category).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting category",async () => {
			const category = await categorieServices.delete(100)
			expect(category).toBe(undefined)
		})
	})

})