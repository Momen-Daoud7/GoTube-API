const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Category = require('./2-category');

const Channel = database.define('channels', {
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
	description:{ 
		type: Sequelize.TEXT,
		allowNull:false
	},
	image: {
		type: Sequelize.STRING,
		allowNull: false,
	}

});

// Relationships
User.hasMany(Channel);
Channel.belongsTo(User);
Category.belongsTo(Channel);
Channel.hasOne(Category);

Channel.sync({force:true})

module.exports = Channel; 