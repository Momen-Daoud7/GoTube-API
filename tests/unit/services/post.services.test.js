const postServices = require('../../../src/services/post.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Post = require('../../../src/models/7-post');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database()
})


beforeEach(async () => {
	await User.deleteMany({})
	await Category.deleteMany({})
	await Channel.deleteMany({})
	await Post.deleteMany({})

	user1 = new User({
			name:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'admin',
			password:"1223393"
		})

	category1 = new Category({ name:"Music"})
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

	post1 = new Post({content: "it was a good day",channel: channel1._id})
	post2 = new Post({content: "it was a bad day",channel: channel2._id})

	await user1.save();
	await category1.save();
	await category2.save();
	await channel1.save();
	await channel2.save();
	await post1.save();
	await post2.save();
})

describe('post services tests', () => {

	it("Should return all postS",async () => {
		const post = await postServices.getPosts();
		expect(post).toEqual(expect.any(Array));
		expect(post[0].content).toBe('it was a good day')
		expect(post[1].content).toBe("it was a bad day")
	})

	it("Should return all channel posts",async () => {
		const post = await postServices.getChannelPosts(channel1._id);
		expect(post).toEqual(expect.any(Array));
		expect(post[0].content).toBe('it was a good day')
	})

	describe('test getpost functionallity', () => {

		it("Should get a single post", async () => {
			const post = await postServices.getPost(post1._id);
			expect(post.content).toBe('it was a good day')
		})

		it("Should return false or undefined when post is not exists", async () => {
			const post = await postServices.getPost(282);
			expect(post).toBe(undefined)
		})
	})

	it("should create new post",async () => {
		const data = { content: "Hello",channel: channel1._id}
		const post = await postServices.store(data)
		console.log(post)
		expect(post.content).toBe(data.content)
	})

	describe("Test update post functionallity",() => {

		it("Should update a post details",async () => {
			const data = {content: "John Do"}
			const post = await postServices.update(post1._id,data)
			expect(post.content).toBe(data.content)
		})

		it("Should return false or undefined when updateing unexiting post",async () => {
			const data = {content: "John Do"}
			const post = await postServices.update(11,data)
			expect(post).toBe(undefined)
		})
	})


	describe("Test delete post functionallity",() => {

		it("Should delete a post",async () => {
			const post = await postServices.delete(post1._id)
			expect(post).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting post",async () => {
			const post = await postServices.delete(100)
			expect(post).toBe(undefined)
		})
	})

})