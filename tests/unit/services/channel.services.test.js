const channelServices = require('../../../src/services/channel.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const database = require('../../../src/config/database');
let user1,category1,category2,channel1,channel2;

// Connect to database
beforeAll(async () => {
	await database()
})


beforeEach(async () => {
	await User.deleteMany({where:{}})
	await Category.deleteMany({where:{}})
	await Channel.deleteMany({where:{}})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'admin',
		password:"1223393"
	})

	category1 = new Category({name:"Music"})
	category2 = new Category({name:"computer"})


	channel1 = new Channel({
		name:"Music for everyone",
		user:user1._id,
		image:"anything.png",
		description:"anything",
		category:category1._id
	})
	channel2 = new Channel({
		name:"code with me",
		image:"anything.png",
		description:"anything",
		user:user1._id,
		category:category1._id
	})

	await user1.save();
	await category1.save();
	await category1.save();
	await channel1.save();
	await channel2.save();
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
			const channel = await channelServices.getChannel(channel1._id);
			expect(channel.name).toBe('Music for everyone')
		})

		it("Should return false or undefined when Channel is not exists", async () => {
			const channel = await channelServices.getChannel(282);
			expect(channel).toBe(undefined)
		})
	})

	it("should create new Channel",async () => {
		const data = { 
			name:"sports",
			user:user1._id,
			image:"anything.png",
			description:"anything",
			category:category2._id
		}
		const channel = await channelServices.store(data)
		console.log(channel)
		expect(channel.name).toBe(data.name)
	})

	describe("Test update Channel functionallity",() => {

		it("Should update a Channel details",async () => {
			const data = {name: "John Do"}
			const channel = await channelServices.update(channel1._id,data)
			expect(channel.name).toBe(data.name)
		})

		it("Should return false or undefined when updateing unexiting Channel",async () => {
			const data = {name: "John Do"}
			const channel = await channelServices.update(11,data)
			expect(channel).toBe(undefined)
		})
	})


	describe("Test delete Channel functionallity",() => {

		it("Should delete a Channel",async () => {
			const channel = await channelServices.delete(channel1._id)
			expect(channel).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting Channel",async () => {
			const channel = await channelServices.delete(100)
			expect(channel).toBe(undefined)
		})
	})

})