const postCommentServices = require('../../../src/services/postComment.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Post = require('../../../src/models/7-post');
const PostComment = require('../../../src/models/8-postComment');
const database = require('../../../src/config/database');
let user1 ,category1, channel1, channel2,post1,post2,postComment1,postComment2;

// Connect to database
beforeAll(async () => {
	await database()
})


beforeEach(async () => {
	await User.deleteMany({})
	await Category.deleteMany({})
	await Channel.deleteMany({})
	await Post.deleteMany({})
	await PostComment.deleteMany({})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'admin',
		password:"1223393"
	})

	category1 = new Category({name:"Music"})
	category1 = new Category({name:"computer"})

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

	post1 = new Post({content: "it was a good day",channel: channel1._id})
	post2 = new Post({content: "it was a bad day",channel: channel2._id})

	postComment1 = new PostComment({ content: "nice",post: post1._id})
	postComment2 = new PostComment({content: "why?",post: post2._id})

	await user1.save();
	await category1.save();
	await channel1.save();
	await channel2.save();
	await post1.save();
	await post2.save();
	await postComment1.save();
	await postComment2.save();
})

describe('postComment services tests', () => {

	it("Should return all postCommentS",async () => {
		const postComment = await postCommentServices.getPostComments(post1._id);
		expect(postComment).toEqual(expect.any(Array));
		expect(postComment[0].content).toBe('nice')
	})

	describe('test getpostComment functionallity', () => {

		it("Should get a single postComment", async () => {
			const postComment = await postCommentServices.getPostComment(postComment1._id);
			expect(postComment.content).toBe('nice')
		})

		it("Should return false or undefined when postComment is not exists", async () => {
			const postComment = await postCommentServices.getPostComment(282);
			expect(postComment).toBe(undefined)
		})
	})

	it("should create new postComment",async () => {
		const data = { 
			content: "Hello",
			post: post2._id
		}
		const postComment = await postCommentServices.store(data)
		console.log(postComment)
		expect(postComment.content).toBe(data.content)
	})

	describe("Test update postComment functionallity",() => {

		it("Should update a postComment details",async () => {
			const data = {content: "John Do",post:post2._id}
			const postComment = await postCommentServices.update(postComment1._id,data)
			expect(postComment.content).toBe(data.content)
		})

		it("Should return false or undefined when updateing unexiting postComment",async () => {
			const data = {content: "John Do"}
			const postComment = await postCommentServices.update(11,data)
			expect(postComment).toBe(undefined)
		})
	})


	describe("Test delete postComment functionallity",() => {

		it("Should delete a postComment",async () => {
			const postComment = await postCommentServices.delete(postComment1._id)
			expect(postComment).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting postComment",async () => {
			const postComment = await postCommentServices.delete(100)
			expect(postComment).toBe(undefined)
		})
	})

})