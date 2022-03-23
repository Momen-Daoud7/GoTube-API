const playlistServices = require('../../../src/services/playlist.services')
const User = require('../../../src/models/1-user');
const Category = require('../../../src/models/2-category');
const Channel = require('../../../src/models/3-channel');
const Playlist = require('../../../src/models/4-playlist');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Category.destroy({where:{}})
	await Channel.destroy({where:{}})
	await Playlist.destroy({where:{}})

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

	await Playlist.bulkCreate([
		{
			id:1,
			name:"Best songs ever",
			channelId:1,
			description:"anything",
		},
		{
			id:2,
			name:"Learn python for beignners",
			channelId:2,
			description:"anything",
		}

	])
})

describe('playlist services tests', () => {

	it("Should return all playlistS",async () => {
		const playlists = await playlistServices.getPlaylists();
		expect(playlists).toEqual(expect.any(Array));
		expect(playlists[0].name).toBe('Best songs ever')
		expect(playlists[1].name).toBe("Learn python for beignners")
	})

	describe('test getplaylist functionallity', () => {

		it("Should get a single playlist", async () => {
			const playlist = await playlistServices.getPlaylist(1);
			expect(playlist.name).toBe('Best songs ever')
		})

		it("Should return false when playlist is not exists", async () => {
			const playlist = await playlistServices.getPlaylist(282);
			expect(playlist).toBe(false)
		})
	})

	it("should create new playlist",async () => {
		const data = { 
			id:3,
			name:"Learn javascript for beignners",
			channelId:2,
			description:"anything",
		}
		const playlist = await playlistServices.store(data)
		console.log(playlist)
		expect(playlist.name).toBe(data.name)
	})

	describe("Test update playlist functionallity",() => {

		it("Should update a playlist details",async () => {
			const data = {name: "John Do"}
			const playlist = await playlistServices.update(1,data)
			expect(playlist.name).toBe(data.name)
		})

		it("Should return false when updateing unexiting playlist",async () => {
			const data = {name: "John Do"}
			const playlist = await playlistServices.update(11,data)
			expect(playlist).toBe(false)
			expect(playlist.name).toBe(undefined)
		})
	})


	describe("Test delete playlist functionallity",() => {

		it("Should delete a playlist",async () => {
			const playlist = await playlistServices.delete(1)
			expect(playlist).toBe(true)
		})

		it("Should return false when updateing unexiting playlist",async () => {
			const playlist = await playlistServices.delete(100)
			expect(playlist).toBe(false)
		})
	})

})