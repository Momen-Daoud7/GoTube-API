const bcrypt = require('bcryptjs');
const User = require('../models/1-user');

module.exports = class userServices {
	// get all users
	static async getUsers() {
		try{
			const users = await User.find({});
			return users;
		}catch(error) {
			console.log(error);
		}
	}

	//store a user
	static async store(data) {
		try{
			data.password = await bcrypt.hash(data.password,12);
			const user = await User.create(data);
			console.log(user)
			return user;
		}catch(error) {
			console.log(error);
		}
	}

	// update a user
	static async update(userId,data) {
		try{
			const oldUser = await User.findById(userId)
			if(!oldUser) {
				return  false;
			}
			const updatedUser = await User.findByIdAndUpdate(userId,data,{
				new:true,
				runValidators:true
			});
			console.log(updatedUser)
				return updatedUser;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a user
	static async delete(userId) {
		try{
			const user = await User.findById(userId);
			if(!user) {
				return false;
			}
			const deleted = await user.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single user
	static async getUser(userId) {
		try{
			const user = await User.findById(userId);
			if(!user) {
				console.log('no user with that id');
				return false;
			}
			return user;
		}catch(error) {
			console.log(error);
		}
	}

	
}