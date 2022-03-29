const Subscribtion = require('../models/9-subscribtion');

module.exports = class SubscribtionServices {
	// get all channels
	static async getSubscribtions(channelId) {
		try{
			const subscribtions = await Subscribtion.find({channel:channelId.toString()});
			return subscribtions;
		}catch(error) {
			console.log(error);
		}
	}

	// get all user's channels
	static async getUserSubscribtions(userId) {
		try{
			const subscribtions = await Subscribtion.find({user:userId.toString()});
			return subscribtions;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Subscribtion
	static async store(data) {
		try{
			const subscribtion = await Subscribtion.create(data);
			return subscribtion;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Subscribtion
	static async update(SubscribtionId,data) {
		try{
			const oldSubscribtion = await Subscribtion.findById(SubscribtionId)
			if(!oldSubscribtion) {
				return  false;
			}
			const updatedSubscribtion = await Subscribtion.findByIdAndUpdate(SubscribtionId,data,{
				new:true,
				runValidators:true
			});
			return updatedSubscribtion;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Subscribtion
	static async delete(SubscribtionId) {
		try{
			const subscribtion = await Subscribtion.findById(SubscribtionId);
			if(!subscribtion) {
				return false;
			}
			await subscribtion.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Subscribtion
	static async getSubscribtion(SubscribtionId) {
		try{
			const subscribtion = await Subscribtion.findById(SubscribtionId);
			if(!subscribtion) {
				console.log('no Subscribtion with that id');
				return false;
			}
			return subscribtion;
		}catch(error) {
			console.log(error);
		}
	}

	
}