const videoCommentServices = require('../../../src/services/videoComment.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Video = require('../../../src/models/5-video');
const VideoComment = require('../../../src/models/6-videoComment');
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
	await VideoComment.destroy({where:{}})

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

	await VideoComment.bulkCreate([
		{
			id:1,
			comment:"Best songs ever",
			videoId:1,
		},
		{
			id:2,
			comment:"Node.js crash course",
			videoId:2,
		},
		{
			id:3,
			comment:"Python crash course",
			videoId:2,
		}
	])
})

describe('videoComment services tests', () => {

	it("Should return all videoCommentS",async () => {
		const videoComments = await videoCommentServices.getVideoComments(2);
		expect(videoComments).toEqual(expect.any(Array));
		console.log(videoComments)
		expect(videoComments[0].comment).toBe('Node.js crash course')
		expect(videoComments[1].comment).toBe("Python crash course")
	})

	describe('test getvideoComment functionallity', () => {

		it("Should get a single videoComment", async () => {
			const videoComment = await videoCommentServices.getVideoComment(1);
			expect(videoComment.comment).toBe('Best songs ever')
		})

		it("Should return false when videoComment is not exists", async () => {
			const videoComment = await videoCommentServices.getVideoComment(282);
			expect(videoComment).toBe(false)
		})
	})

	it("should create new videoComment",async () => {
		const data = { 
			comment:"Node.js crash course",
			videoId:2,
		}
		const videoComment = await videoCommentServices.store(data)
		console.log(videoComment)
		expect(videoComment.comment).toBe(data.comment)
	})

	describe("Test update videoComment functionallity",() => {

		it("Should update a videoComment details",async () => {
			const data = {comment: "John Do"}
			const videoComment = await videoCommentServices.update(1,data)
			expect(videoComment.comment).toBe(data.comment)
		})

		it("Should return false when updateing unexiting videoComment",async () => {
			const data = {comment: "John Do"}
			const videoComment = await videoCommentServices.update(11,data)
			expect(videoComment).toBe(false)
			expect(videoComment.comment).toBe(undefined)
		})
	})


	describe("Test delete videoComment functionallity",() => {

		it("Should delete a videoComment",async () => {
			const videoComment = await videoCommentServices.delete(1)
			expect(videoComment).toBe(true)
		})

		it("Should return false when updateing unexiting videoComment",async () => {
			const videoComment = await videoCommentServices.delete(100)
			expect(videoComment).toBe(false)
		})
	})

})