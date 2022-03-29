const videoCommentServices = require('../../../src/services/videoComment.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Video = require('../../../src/models/5-video');
const VideoComment = require('../../../src/models/6-videoComment');
const database = require('../../../src/config/database');
let user1,category1,category2,channel1,channel2,video1,video2,videoComment1,videoComment2;

// Connect to database
beforeAll(async () => {
	await database()
})


beforeEach(async () => {
	await User.deleteMany({})
	await Category.deleteMany({})
	await Channel.deleteMany({})
	await Video.deleteMany({})
	await VideoComment.deleteMany({})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'admin',
		password:"1223393"
	});

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
		channel:channel2._id,
		description:"anything",
		image:"any.jpg"
	})

	videoComment1 = new VideoComment({comment:"Node.js crash course",video:video1._id,user:user1._id})
	videoComment2 = new VideoComment({comment:"Python crash course",video:video1._id,user:user1._id})

	await user1.save();
	await category1.save();
	await category2.save();
	await channel1.save();
	await channel2.save();
	await video1.save();
	await video2.save();
	await videoComment1.save();
	await videoComment2.save();
		
})

describe('videoComment services tests', () => {

	it("Should return all videoCommentS",async () => {
		const videoComments = await videoCommentServices.getVideoComments(video1._id);
		expect(videoComments).toEqual(expect.any(Array));
		console.log(videoComments)
		expect(videoComments[0].comment).toBe('Node.js crash course')
		expect(videoComments[1].comment).toBe("Python crash course")
	})

	describe('test getvideoComment functionallity', () => {

		it("Should get a single videoComment", async () => {
			const videoComment = await videoCommentServices.getVideoComment(videoComment1._id);
			expect(videoComment.comment).toBe('Node.js crash course')
		})

		it("Should return false or undefined when videoComment is not exists", async () => {
			const videoComment = await videoCommentServices.getVideoComment(282);
			expect(videoComment).toBe(undefined)
		})
	})

	it("should create new videoComment",async () => {
		const data = { 
			comment:"Node.js crash course",
			video:video2._id,
			user:user1._id
		}
		const videoComment = await videoCommentServices.store(data)
		console.log(videoComment)
		expect(videoComment.comment).toBe(data.comment)
	})

	describe("Test update videoComment functionallity",() => {

		it("Should update a videoComment details",async () => {
			const data = {comment: "John Do"}
			const videoComment = await videoCommentServices.update(videoComment1._id,data)
			expect(videoComment.comment).toBe(data.comment)
		})

		it("Should return false or undefined when updateing unexiting videoComment",async () => {
			const data = {comment: "John Do"}
			const videoComment = await videoCommentServices.update(11,data)
			expect(videoComment).toBe(undefined)
		})
	})


	describe("Test delete videoComment functionallity",() => {

		it("Should delete a videoComment",async () => {
			const videoComment = await videoCommentServices.delete(videoComment1._id)
			expect(videoComment).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting videoComment",async () => {
			const videoComment = await videoCommentServices.delete(100)
			expect(videoComment).toBe(undefined)
		})
	})

})