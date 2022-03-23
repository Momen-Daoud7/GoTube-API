const Sequelize = require('sequelize');

const database = require('../config/database');

const Channel = require('./3-channel');

const Post = database.define('posts', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING
	}

});

Channel.hasMany(Post);
Post.belongsTo(Channel);

module.exports = Post; 