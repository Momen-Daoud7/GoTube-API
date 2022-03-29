const videoServices = require('../../../src/services/video.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Video = require('../../../src/models/5-video');
const database = require('../../../src/config/database');
let user1,category1,category2,channel1,channel2,video1,video2;

// Connect to database
beforeAll(async () => {
	await database()
})


beforeEach(async () => {
	await User.deleteMany({})
	await Category.deleteMany({})
	await Channel.deleteMany({})
	await Video.deleteMany({})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'admin',
		password:"1223393"
	})

	category1 = new Category({name:"Music"});
	category2 = new Category({name:"computer"});

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

	video1 = new Video({
		title:"Best songs ever",
		channel:channel1._id,
		description:"anything",
		image:"any.jpg"
	})
	video2 = new Video({
		title:"Node.js crash course",
		channel:channel1._id,
		description:"anything",
		image:"any.jpg"
	})

	await user1.save();
	await category1.save();
	await category2.save();
	await channel1.save();
	await channel2.save();
	await video1.save();
	await video2.save();
})

describe('video services tests', () => {

	it("Should return all videoS",async () => {
		const videos = await videoServices.getVideos();
		expect(videos).toEqual(expect.any(Array));
		expect(videos[0].title).toBe('Best songs ever')
		expect(videos[1].title).toBe("Node.js crash course")
	})

	describe('test getvideo functionallity', () => {

		it("Should get a single video", async () => {
			const video = await videoServices.getVideo(video1._id);
			expect(video.title).toBe('Best songs ever')
		})

		it("Should return false or undefined when video is not exists", async () => {
			const video = await videoServices.getVideo(282);
			expect(video).toBe(undefined)
		})
	})

	it("should create new video",async () => {
		const data = { 
			title:"python crash course",
			channel:channel1._id,
			description:"anything",
			image:"any.jpg"
		}
		const video = await videoServices.store(data)
		expect(video.title).toBe(data.title)
	})

	describe("Test update video functionallity",() => {

		it("Should update a video details",async () => {
			const data = {title: "John Do"}
			const video = await videoServices.update(video1._id,data)
			expect(video.title).toBe(data.title)
		})

		it("Should return false or undefined when updateing unexiting video",async () => {
			const data = {title: "John Do"}
			const video = await videoServices.update(11,data)
			expect(video).toBe(undefined)
		})
	})


	describe("Test delete video functionallity",() => {

		it("Should delete a video",async () => {
			const video = await videoServices.delete(video1._id)
			expect(video).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting video",async () => {
			const video = await videoServices.delete(100)
			expect(video).toBe(undefined)
		})
	})

})