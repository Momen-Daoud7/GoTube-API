const userServices = require('../../../src/services/user.services')
const User = require('../../../src/models/1-user');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})

	await User.bulkCreate([
		{
			id:1,
			name:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'admin',
			password:"1223393"
		},
		{
			id:2,
			name:"Ahmed Daoud Momen Daoud",
			email:"ahmed@mail.com",
			role:'user',
			password:"1223393"
		}

	])
})

describe('User services tests', () => {

	it("Should return all users",async () => {
		const users = await userServices.getUsers();
		expect(users).toEqual(expect.any(Array));
		expect(users[0].name).toBe('Momen Daoud Momen Daoud')
		expect(users[1].name).toBe('Ahmed Daoud Momen Daoud')
	})

	describe('test getUser functionallity', () => {

		it("Should get a single user", async () => {
			const user = await userServices.getUser(1);
			expect(user.name).toBe('Momen Daoud Momen Daoud')
		})

		it("Should return false when user is not exists", async () => {
			const user = await userServices.getUser(282);
			expect(user).toBe(false)
		})
	})

	it("should create new user",async () => {
		const data = {
			name:"John Do",
			email:"momen12@mail.com",
			role:'manager',
			password:"1223393"
		}
		const user = await userServices.store(data)
		expect(user.name).toBe(data.name)
	})

	describe("Test update user functionallity",() => {

		it("Should update a user details",async () => {
			const data = {name: "John Do"}
			const user = await userServices.update(1,data)
			expect(user.name).toBe(data.name)
		})

		it("Should return false when updateing unexiting user",async () => {
			const data = {name: "John Do"}
			const user = await userServices.update(11,data)
			expect(user).toBe(false)
			expect(user.name).toBe(undefined)
		})
	})


	describe("Test delete user functionallity",() => {

		it("Should delete a user",async () => {
			const user = await userServices.delete(1)
			expect(user).toBe(true)
		})

		it("Should return false when updateing unexiting user",async () => {
			const user = await userServices.delete(100)
			expect(user).toBe(false)
		})
	})

})