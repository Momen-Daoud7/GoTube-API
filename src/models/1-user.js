const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const database = require('../config/database');
					
const User = database.define('users', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
	    type: Sequelize.STRING,
	    allowNull:false,
	    unique: true,
	    validate: {
	    	isEmail:true
	    }
  	},
    role: {
	    type: Sequelize.ENUM('admin','user'),
	    defaultValue:"user",
	    allowNull:false
  	},
  	status: {
	    type: Sequelize.ENUM('Pending',"Active"),
	    allowNull:false,
	    defaultValue:"Pending"
  	},
    password: {
	    type: Sequelize.STRING,
	    allowNull:false,
  	},
  	resetPasswordToken: {
	  	type: Sequelize.STRING,
	},
	resetPasswordExpire: {
	  	type: Sequelize.DATE
	},
	confirmationCode: {
	  	type: Sequelize.STRING,
	},

});

// Match passwords
User.prototype.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

// Get signed User
User.prototype.getSignedJwtToken = function() {
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
      expiresIn:"30d"
    })
}

User.prototype.getResetPasswordToken = async function() {
	// Genrate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set it to resetPassword field
	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// set expires
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
}

module.exports = User; 