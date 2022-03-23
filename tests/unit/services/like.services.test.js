const likeServices = require('../../../src/services/like.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Video = require('../../../src/models/5-video');
const Post = require('../../../src/models/7-post');
const Like = require('../../../src/models/901-like');
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
	await Post.destroy({where:{}})
	await Like.destroy({where:{}})

	await User.bulkCreate([
		{
			id:1,
			userId:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'admin',
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

	await Video.bulkCreate([
		{
			id:1,
			title:"Best songs ever",
			channelId:1,
			description:"anything",
			image:"any.jpg"
		}
	])

	await Post.bulkCreate([
		{
			id:1,
			content: "it was a good day",
			channelId: 1
		},
		{
			id:2,
			content: "it was a bad day",
			channelId: 1
		}
	])

	await Like.bulkCreate([
		{
			id:1,
			userId:1,
			videoId:1,
		},
		{
			id:2,
			userId:1,
			postId:1,
		}

	])
})

describe('like services tests', () => {

	it("Should return all likes",async () => {
		const like = await likeServices.getLikes();
		expect(like).toEqual(expect.any(Array));
		expect(like[0].videoId).toBe(1)
		expect(like[1].postId).toBe(1)
	})

	describe('test getlike functionallity', () => {

		it("Should get a single like", async () => {
			const like = await likeServices.getLike(1);
			console.log(like)
			expect(like.userId).toBe(1)
		})

		it("Should return false when like is not exists", async () => {
			const like = await likeServices.getLike(282);
			expect(like).toBe(false)
		})
	})

	it("should create new like",async () => {
		const data = { 
			id:3,
			userId:1,
			postId:2
		}
		const like = await likeServices.store(data)
		console.log(like)
		expect(like.userId).toBe(data.userId)
		expect(like.postId).toBe(data.postId)
	})

	describe("Test update like functionallity",() => {

		it("Should update a like details",async () => {
			const data = {postId: 2}
			const like = await likeServices.update(2,data)
			expect(like.postId).toBe(data.postId)
		})

		it("Should return false when updateing unexiting like",async () => {
			const data = {postId:2}
			const like = await likeServices.update(11,data)
			expect(like).toBe(false)
			expect(like.postId).toBe(undefined)
		})
	})


	describe("Test delete like functionallity",() => {

		it("Should delete a like",async () => {
			const like = await likeServices.delete(1)
			expect(like).toBe(true)
		})

		it("Should return false when updateing unexiting like",async () => {
			const like = await likeServices.delete(100)
			expect(like).toBe(false)
		})
	})

})