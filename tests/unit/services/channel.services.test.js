const channelServices = require('../../../src/services/channel.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Category.destroy({where:{}})
	await Channel.destroy({where:{}})

	await User.bulkCreate([
		{
			id:1,
			name:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'admin',
			password:"1223393"
		}
	])

	await Category.bulkCreate([
		{
			id:1,
			name:"Music"
		},
		{
			id:2,
			name:"computer"
		}

	])

	await Channel.bulkCreate([
		{
			id:1,
			name:"Music for everyone",
			userId:1,
			image:"anything.png",
			description:"anything",
			categoryId:1
		},
		{
			id:2,
			name:"code with me",
			image:"anything.png",
			description:"anything",
			userId:1,
			categoryId:2
		}

	])
})

describe('Channel services tests', () => {

	it("Should return all channelS",async () => {
		const channel = await channelServices.getChannels();
		expect(channel).toEqual(expect.any(Array));
		expect(channel[0].name).toBe('Music for everyone')
		expect(channel[1].name).toBe("code with me")
	})

	describe('test getChannel functionallity', () => {

		it("Should get a single Channel", async () => {
			const channel = await channelServices.getChannel(1);
			expect(channel.name).toBe('Music for everyone')
		})

		it("Should return false when Channel is not exists", async () => {
			const channel = await channelServices.getChannel(282);
			expect(channel).toBe(false)
		})
	})

	it("should create new Channel",async () => {
		const data = { 
			id:3,
			name:"sports",
			userId:1,
			image:"anything.png",
			description:"anything",
			categoryId:2
		}
		const channel = await channelServices.store(data)
		console.log(channel)
		expect(channel.name).toBe(data.name)
	})

	describe("Test update Channel functionallity",() => {

		it("Should update a Channel details",async () => {
			const data = {name: "John Do"}
			const channel = await channelServices.update(1,data)
			expect(channel.name).toBe(data.name)
		})

		it("Should return false when updateing unexiting Channel",async () => {
			const data = {name: "John Do"}
			const channel = await channelServices.update(11,data)
			expect(channel).toBe(false)
			expect(channel.name).toBe(undefined)
		})
	})


	describe("Test delete Channel functionallity",() => {

		it("Should delete a Channel",async () => {
			const channel = await channelServices.delete(1)
			expect(channel).toBe(true)
		})

		it("Should return false when updateing unexiting Channel",async () => {
			const channel = await channelServices.delete(100)
			expect(channel).toBe(false)
		})
	})

})