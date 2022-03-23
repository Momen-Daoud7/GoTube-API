const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Channel = require('./3-channel');

const Subscribtion = database.define('subscribtions', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},

});

// Relationships
User.belongsToMany(Channel,{through:Subscribtion,as:"userId"});
Channel.belongsToMany(User,{through:Subscribtion,as:"channelId"});

module.exports = Subscribtion; 