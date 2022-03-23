const categorieServices = require('../../../src/services/category.services')
const category = require('../../../src/models/2-category');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await category.destroy({where:{}})

	await category.bulkCreate([
		{
			id:1,
			name:"Music"
		},
		{
			id:2,
			name:"computer"
		}

	])
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
			const category = await categorieServices.getCategory(1);
			expect(category.name).toBe('Music')
		})

		it("Should return false when category is not exists", async () => {
			const category = await categorieServices.getCategory(282);
			expect(category).toBe(false)
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
			const category = await categorieServices.update(1,data)
			expect(category.name).toBe(data.name)
		})

		it("Should return false when updateing unexiting category",async () => {
			const data = {name: "John Do"}
			const category = await categorieServices.update(11,data)
			expect(category).toBe(false)
			expect(category.name).toBe(undefined)
		})
	})


	describe("Test delete category functionallity",() => {

		it("Should delete a category",async () => {
			const category = await categorieServices.delete(1)
			expect(category).toBe(true)
		})

		it("Should return false when updateing unexiting category",async () => {
			const category = await categorieServices.delete(100)
			expect(category).toBe(false)
		})
	})

})