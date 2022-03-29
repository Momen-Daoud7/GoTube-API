const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required:[true,"Name is required."]
	},
	email: {
		type:String,
		required:[true,"Email is required."],
		unique:true
	},
	role: {
		type:String,
		enum:['admin','user'],
		required:[true,"Role is required"],
		default:'user'
  	},
  	status: {
  		type:String,
		enum:['Pending',"Active"],
		required:[true,"Status is required"],
		default:'Pending'
  	},
  	resetPasswordToken: {
	  	type: String,
	},
	resetPasswordExpire: {
	  	type: String,
	},
	confirmationCode: {
	  	type: String,
	},
	password: {
		type:String,
		requried:[true,"Password is required."]
	},
	channels:[{
		type: Schema.Types.ObjectId,
		ref:'channels'
	}]
});


UserSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword,this.password);
}

// Get signed User
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
      expiresIn:"30d"
    })
}

UserSchema.methods.getResetPasswordToken = async function() {
	// Genrate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set it to resetPassword field
	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// set expires
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
}


const User = mongoose.model('user',UserSchema);

module.exports = User;