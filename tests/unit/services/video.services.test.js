const videoServices = require('../../../src/services/video.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Video = require('../../../src/models/5-video');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Category.destroy({where:{}})
	await Channel.destroy({where:{}})
	await Video.destroy({where:{}})

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

	await Video.bulkCreate([
		{
			id:1,
			title:"Best songs ever",
			channelId:1,
			description:"anything",
			image:"any.jpg"
		},
		{
			id:2,
			title:"Node.js crash course",
			channelId:2,
			description:"anything",
			image:"any.jpg"
		}

	])
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
			const video = await videoServices.getVideo(1);
			expect(video.title).toBe('Best songs ever')
		})

		it("Should return false when video is not exists", async () => {
			const video = await videoServices.getVideo(282);
			expect(video).toBe(false)
		})
	})

	it("should create new video",async () => {
		const data = { 
			id:3,
			title:"python crash course",
			channelId:2,
			description:"anything",
			image:"any.jpg"
		}
		const video = await videoServices.store(data)
		console.log(video)
		expect(video.title).toBe(data.title)
	})

	describe("Test update video functionallity",() => {

		it("Should update a video details",async () => {
			const data = {title: "John Do"}
			const video = await videoServices.update(1,data)
			expect(video.title).toBe(data.title)
		})

		it("Should return false when updateing unexiting video",async () => {
			const data = {title: "John Do"}
			const video = await videoServices.update(11,data)
			expect(video).toBe(false)
			expect(video.title).toBe(undefined)
		})
	})


	describe("Test delete video functionallity",() => {

		it("Should delete a video",async () => {
			const video = await videoServices.delete(1)
			expect(video).toBe(true)
		})

		it("Should return false when updateing unexiting video",async () => {
			const video = await videoServices.delete(100)
			expect(video).toBe(false)
		})
	})

})