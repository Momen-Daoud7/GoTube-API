const subscribtionServices = require('../../../src/services/subscribtion.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Subscribtion = require('../../../src/models/9-subscribtion');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Category.destroy({where:{}})
	await Channel.destroy({where:{}})
	await Subscribtion.destroy({where:{}})

	await User.bulkCreate([
		{
			id:1,
			userId:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'admin',
			password:"1223393"
		},
		{
			id:2,
			userId:"Ahmed Mohmmed",
			email:"momen1@mail.com",
			role:'user',
			password:"1223393"
		}
	])

	await Category.bulkCreate([
		{
			id:1,
			userId:"Music"
		},
		{
			id:2,
			userId:"computer"
		}

	])

	await Channel.bulkCreate([
		{
			id:1,
			userId:"Music for everyone",
			userId:1,
			image:"anything.png",
			description:"anything",
			categoryId:1
		},
		{
			id:2,
			userId:"code with me",
			image:"anything.png",
			description:"anything",
			userId:1,
			categoryId:2
		}

	])


	await Subscribtion.bulkCreate([
		{
			id:1,
			userId:2,
			channelId:1
		},
		{
			id:2,
			userId:2,
			channelId:2
		}

	])
})

describe('subscribtion services tests', () => {

	it("Should return all subscribtionS",async () => {
		const subscribtion = await subscribtionServices.getSubscribtions();
		expect(subscribtion).toEqual(expect.any(Array));
		expect(subscribtion[0].channelId).toBe(1)
		expect(subscribtion[1].channelId).toBe(2)
	})

	describe('test getsubscribtion functionallity', () => {

		it("Should get a single subscribtion", async () => {
			const subscribtion = await subscribtionServices.getSubscribtion(1);
			expect(subscribtion.channelId).toBe(1)
		})

		it("Should return false when subscribtion is not exists", async () => {
			const subscribtion = await subscribtionServices.getSubscribtion(282);
			expect(subscribtion).toBe(false)
		})
	})

	it("should create new subscribtion",async () => {
		const data = { 
			id:3,
			channelId:2,
			userId:1
		}
		const subscribtion = await subscribtionServices.store(data)
		console.log(subscribtion)
		expect(subscribtion.userId).toBe(data.userId)
	})

	describe("Test update subscribtion functionallity",() => {

		it("Should update a subscribtion details",async () => {
			const data = {userId: 1}
			const subscribtion = await subscribtionServices.update(1,data)
			expect(subscribtion.userId).toBe(data.userId)
		})

		it("Should return false when updateing unexiting subscribtion",async () => {
			const data = {userId: 1}
			const subscribtion = await subscribtionServices.update(11,data)
			expect(subscribtion).toBe(false)
			expect(subscribtion.userId).toBe(undefined)
		})
	})


	describe("Test delete subscribtion functionallity",() => {

		it("Should delete a subscribtion",async () => {
			const subscribtion = await subscribtionServices.delete(1)
			expect(subscribtion).toBe(true)
		})

		it("Should return false when updateing unexiting subscribtion",async () => {
			const subscribtion = await subscribtionServices.delete(100)
			expect(subscribtion).toBe(false)
		})
	})

})