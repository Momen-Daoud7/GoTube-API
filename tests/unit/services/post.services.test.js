const postServices = require('../../../src/services/post.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Post = require('../../../src/models/7-post');
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
})

describe('post services tests', () => {

	it("Should return all postS",async () => {
		const post = await postServices.getPosts();
		expect(post).toEqual(expect.any(Array));
		expect(post[0].content).toBe('it was a good day')
		expect(post[1].content).toBe("it was a bad day")
	})

	it("Should return all channel posts",async () => {
		const post = await postServices.getChannelPosts(1);
		expect(post).toEqual(expect.any(Array));
		expect(post[0].content).toBe('it was a good day')
	})

	describe('test getpost functionallity', () => {

		it("Should get a single post", async () => {
			const post = await postServices.getPost(1);
			expect(post.content).toBe('it was a good day')
		})

		it("Should return false when post is not exists", async () => {
			const post = await postServices.getPost(282);
			expect(post).toBe(false)
		})
	})

	it("should create new post",async () => {
		const data = { 
			id:3,
			content: "Hello",
			channelId: 2
		}
		const post = await postServices.store(data)
		console.log(post)
		expect(post.content).toBe(data.content)
	})

	describe("Test update post functionallity",() => {

		it("Should update a post details",async () => {
			const data = {content: "John Do"}
			const post = await postServices.update(1,data)
			expect(post.content).toBe(data.content)
		})

		it("Should return false when updateing unexiting post",async () => {
			const data = {content: "John Do"}
			const post = await postServices.update(11,data)
			expect(post).toBe(false)
			expect(post.content).toBe(undefined)
		})
	})


	describe("Test delete post functionallity",() => {

		it("Should delete a post",async () => {
			const post = await postServices.delete(1)
			expect(post).toBe(true)
		})

		it("Should return false when updateing unexiting post",async () => {
			const post = await postServices.delete(100)
			expect(post).toBe(false)
		})
	})

})