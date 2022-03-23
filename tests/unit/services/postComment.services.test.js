const postCommentServices = require('../../../src/services/postComment.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Post = require('../../../src/models/7-post');
const PostComment = require('../../../src/models/8-postComment');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Category.destroy({where:{}})
	await Channel.destroy({where:{}})
	await Post.destroy({where:{}})
	await PostComment.destroy({where:{}})

	await User.bulkCreate([
		{
			id:1,
			content:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'admin',
			password:"1223393"
		}
	])

	await Category.bulkCreate([
		{
			id:1,
			content:"Music"
		},
		{
			id:2,
			content:"computer"
		}

	])

	await Channel.bulkCreate([
		{
			id:1,
			content:"Music for everyone",
			userId:1,
			image:"anything.png",
			description:"anything",
			categoryId:1
		},
		{
			id:2,
			content:"code with me",
			image:"anything.png",
			description:"anything",
			userId:1,
			categoryId:2
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
			channelId: 2
		}
	])

	await PostComment.bulkCreate([
		{
			id:1,
			content: "nice",
			postId: 1
		},
		{
			id:2,
			content: "why?",
			postId: 2
		}
	])
})

describe('postComment services tests', () => {

	it("Should return all postCommentS",async () => {
		const postComment = await postCommentServices.getPostComments();
		expect(postComment).toEqual(expect.any(Array));
		expect(postComment[0].content).toBe('nice')
		expect(postComment[1].content).toBe("why?")
	})

	describe('test getpostComment functionallity', () => {

		it("Should get a single postComment", async () => {
			const postComment = await postCommentServices.getPostComment(1);
			expect(postComment.content).toBe('nice')
		})

		it("Should return false when postComment is not exists", async () => {
			const postComment = await postCommentServices.getPostComment(282);
			expect(postComment).toBe(false)
		})
	})

	it("should create new postComment",async () => {
		const data = { 
			id:3,
			content: "Hello",
			postId: 2
		}
		const postComment = await postCommentServices.store(data)
		console.log(postComment)
		expect(postComment.content).toBe(data.content)
	})

	describe("Test update postComment functionallity",() => {

		it("Should update a postComment details",async () => {
			const data = {content: "John Do"}
			const postComment = await postCommentServices.update(1,data)
			expect(postComment.content).toBe(data.content)
		})

		it("Should return false when updateing unexiting postComment",async () => {
			const data = {content: "John Do"}
			const postComment = await postCommentServices.update(11,data)
			expect(postComment).toBe(false)
			expect(postComment.content).toBe(undefined)
		})
	})


	describe("Test delete postComment functionallity",() => {

		it("Should delete a postComment",async () => {
			const postComment = await postCommentServices.delete(1)
			expect(postComment).toBe(true)
		})

		it("Should return false when updateing unexiting postComment",async () => {
			const postComment = await postCommentServices.delete(100)
			expect(postComment).toBe(false)
		})
	})

})