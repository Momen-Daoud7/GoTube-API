const playlistServices = require('../../../src/services/playlist.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Playlist = require('../../../src/models/4-playlist');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database()
})

let user1,category1,category2,channel1,channel2,playlist1,playlist2
beforeEach(async () => {
	await User.deleteMany({})
	await Category.deleteMany({})
	await Channel.deleteMany({})
	await Playlist.deleteMany({})

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
		});
	channel2 = new Channel({
			name:"code with me",
			image:"anything.png",
			description:"anything",
			user:user1._id,
			category:category2._id
		})

	playlist1 = new Playlist({
			name:"Best songs ever",
			channel:channel1._id,
			description:"anything",
		})
	playlist2= new Playlist({
			name:"Learn python for beignners",
			channel:channel2._id,
			description:"anything",
		})

	await user1.save();
	await category1.save();
	await category2.save();
	await channel1.save();
	await channel2.save();
	await playlist1.save();
	await playlist2.save();
})

describe('playlist services tests', () => {

	it("Should return all playlistS",async () => {
		const playlists = await playlistServices.getPlaylists(channel1._id);
		expect(playlists).toEqual(expect.any(Array));
		expect(playlists[0].name).toBe('Best songs ever')
	})

	describe('test getplaylist functionallity', () => {

		it("Should get a single playlist", async () => {
			const playlist = await playlistServices.getPlaylist(playlist1._id);
			expect(playlist.name).toBe('Best songs ever')
		})

		it("Should return false or undefined when playlist is not exists", async () => {
			const playlist = await playlistServices.getPlaylist(282);
			expect(playlist).toBe(undefined)
		})
	})

	it("should create new playlist",async () => {
		const data = { 
			name:"Learn javascript for beignners",
			channel:channel2._id,
			description:"anything",
		}
		const playlist = await playlistServices.store(data)
		console.log(playlist)
		expect(playlist.name).toBe(data.name)
	})

	describe("Test update playlist functionallity",() => {

		it("Should update a playlist details",async () => {
			const data = {name: "John Do"}
			const playlist = await playlistServices.update(playlist1._id,data)
			expect(playlist.name).toBe(data.name)
		})

		it("Should return false or undefined when updateing unexiting playlist",async () => {
			const data = {name: "John Do"}
			const playlist = await playlistServices.update(11,data)
			expect(playlist).toBe(undefined)
		})
	})


	describe("Test delete playlist functionallity",() => {

		it("Should delete a playlist",async () => {
			const playlist = await playlistServices.delete(playlist1._id)
			expect(playlist).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting playlist",async () => {
			const playlist = await playlistServices.delete(100)
			expect(playlist).toBe(undefined)
		})
	})

})