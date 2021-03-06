const Channel = require('../models/3-channel');

module.exports = class ChannelServices {
	// get all categories
	static async getChannels() {
		try{
			const channels = await Channel.findAll();
			return channels;
		}catch(error) {
			console.log(error);
		}
	}

	// Check if the user owns the channel
	static async isUserChannel(userId,channelId) {
		try {
			const user = await Channel.findOne({where:{userId,id:channelId}});
			if(!user) {
				return false
			}
			return user;
		}catch(error) {
			console.log(error)
		}
	}

	//store a Channel
	static async store(data) {
		try{
			const channel = await Channel.create(data);
			return channel;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Channel
	static async update(ChannelId,data) {
		try{
			const oldChannel = await Channel.findByPk(ChannelId)
			if(!oldChannel) {
				return  false;
			}
			const updatedChannel = await oldChannel.update(data);
			return updatedChannel;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Channel
	static async delete(ChannelId) {
		try{
			const channel = await Channel.findByPk(ChannelId);
			if(!channel) {
				return false;
			}
			const deleted = await channel.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Channel
	static async getChannel(ChannelId) {
		try{
			const channel = await Channel.findByPk(ChannelId);
			if(!channel) {
				console.log('no Channel with that id');
				return false;
			}
			return channel;
		}catch(error) {
			console.log(error);
		}
	}

	
}