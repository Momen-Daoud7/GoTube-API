const subscribtionServices = require('../../../src/services/subscribtion.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Subscribtion = require('../../../src/models/9-subscribtion');
const database = require('../../../src/config/database');
let user1,user2,category1,category2,channel1,channel2,subscribtion1,subscribtion2;


// Connect to database
beforeAll(async () => {
	await database()
})


beforeEach(async () => {
	await User.deleteMany({})
	await Category.deleteMany({})
	await Channel.deleteMany({})
	await Subscribtion.deleteMany({})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'admin',
		password:"1223393"
	})
	user2 = new User({
		name:"Ahmed Mohmmed",
		email:"momen1@mail.com",
		role:'user',
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
		category:category2._id
	})

	subscribtion1 = new Subscribtion({user:user1._id,channel:channel1._id}),
	subscribtion2 = new Subscribtion({user:user2._id,channel:channel2._id}),

	await user1.save();
	await user2.save();
	await category1.save();
	await category2.save();
	await channel1.save();
	await channel2.save();
	await subscribtion1.save();
	await subscribtion2.save();
})

describe('subscribtion services tests', () => {

	it("Should return all subscribtionS",async () => {
		const subscribtion = await subscribtionServices.getSubscribtions(channel1._id);
		expect(subscribtion).toEqual(expect.any(Array));
		expect(subscribtion[0].channel.toString()).toBe(subscribtion1.channel.toString())
	})

	it("Should return all user subscribtionS",async () => {
		const subscribtion = await subscribtionServices.getUserSubscribtions(user1._id);
		expect(subscribtion).toEqual(expect.any(Array));
		expect(subscribtion[0].channel.toString()).toBe(subscribtion1.channel.toString())
	})

	describe('test getsubscribtion functionallity', () => {

		it("Should get a single subscribtion", async () => {
			const subscribtion = await subscribtionServices.getSubscribtion(subscribtion1._id);
			expect(subscribtion.channel.toString()).toBe(subscribtion1.channel.toString())
		})

		it("Should return false or undefined when subscribtion is not exists", async () => {
			const subscribtion = await subscribtionServices.getSubscribtion(282);
			expect(subscribtion).toBe(undefined)
		})
	})

	it("should create new subscribtion",async () => {
		const data = { 
			channel:channel1._id,
			user:user1._id
		}
		const subscribtion = await subscribtionServices.store(data)
		console.log(subscribtion)
		expect(subscribtion.user.toString()).toBe(data.user.toString())
	})

	describe("Test update subscribtion functionallity",() => {

		it("Should update a subscribtion details",async () => {
			const data = {user: user2._id}
			const subscribtion = await subscribtionServices.update(subscribtion1._id,data)
			expect(subscribtion.user.toString()).toBe(data.user.toString())
		})

		it("Should return false or undefined when updateing unexiting subscribtion",async () => {
			const data = {user:1}
			const subscribtion = await subscribtionServices.update(11,data)
			expect(subscribtion).toBe(undefined)
		})
	})


	describe("Test delete subscribtion functionallity",() => {

		it("Should delete a subscribtion",async () => {
			const subscribtion = await subscribtionServices.delete(subscribtion1._id)
			expect(subscribtion).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting subscribtion",async () => {
			const subscribtion = await subscribtionServices.delete(100)
			expect(subscribtion).toBe(undefined)
		})
	})

})