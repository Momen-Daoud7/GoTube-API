const likeServices = require('../../../src/services/like.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Video = require('../../../src/models/5-video');
const Post = require('../../../src/models/7-post');
const Like = require('../../../src/models/901-like');
const database = require('../../../src/config/database');
let user1,category1,category2,channel1,channel2,video1,post1,post2,like1,like2;

// Connect to database
beforeAll(async () => {
	await database()
})


beforeEach(async () => {
	await User.deleteMany({})
	await Category.deleteMany({})
	await Channel.deleteMany({})
	await Video.deleteMany({})
	await Post.deleteMany({})
	await Like.deleteMany({})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'admin',
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

	video1 = new Video({
		title:"Best songs ever",
		channel:channel1._id,
		description:"anything",
		image:"any.jpg"
	})

	post1 = new Post({content: "it was a good day",channel: channel2._id})
	post2 = new Post({content: "it was a bad day",channel: channel1._id})

	like1 = new Like({user:user1._id,video:video1._id})
	like2 = new Like({user:user1._id,post:post1._id})

	await user1.save();
	await category1.save();
	await category2.save();
	await channel1.save();
	await channel2.save();
	await video1.save();
	await post1.save();
	await post2.save();
	await like1.save();
	await like2.save();


})

describe('like services tests', () => {

	it("Should return all video's likes",async () => {
		const like = await likeServices.getVideoLikes(video1._id);
		expect(like).toEqual(expect.any(Array));
		expect(like[0].video.toString()).toBe(video1._id.toString())
	})

	it("Should return all post's likes",async () => {
		const like = await likeServices.getPostLikes(post1._id);
		expect(like).toEqual(expect.any(Array));
		expect(like[0].post.toString()).toBe(post1._id.toString())
	})

	describe('test getlike functionallity', () => {

		it("Should get a single like", async () => {
			const like = await likeServices.getLike(like1._id);
			console.log(like)
			expect(like.user.toString()).toBe(user1._id.toString())
		})

		it("Should return false or undefined when like is not exists", async () => {
			const like = await likeServices.getLike(282);
			expect(like).toBe(undefined)
		})
	})

	it("should create new like",async () => {
		const data = { 
			user:user1._id,
			post:post2._id
		}
		const like = await likeServices.store(data)
		console.log(like)
		expect(like.user.toString()).toBe(data.user.toString())
		expect(like.post.toString()).toBe(data.post.toString())
	})

	describe("Test update like functionallity",() => {

		it("Should update a like details",async () => {
			const data = {post: post2._id}
			const like = await likeServices.update(like2._id,data)
			expect(like.post.toString()).toBe(data.post.toString())
		})

		it("Should return false when updateing unexiting like",async () => {
			const data = {postId:2}
			const like = await likeServices.update(11,data)
			expect(like).toBe(undefined)
		})
	})


	describe("Test delete like functionallity",() => {

		it("Should delete a like",async () => {
			const like = await likeServices.delete(like1._id)
			expect(like).toBe(true)
		})

		it("Should return false when updateing unexiting like",async () => {
			const like = await likeServices.delete(100)
			expect(like).toBe(undefined)
		})
	})

})