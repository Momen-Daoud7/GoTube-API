const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Post = require('./7-post');

const PostComment = database.define('post_comments', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false,
	}

});

Post.hasMany(PostComment);
PostComment.belongsTo(Post);
User.hasMany(PostComment);
PostComment.belongsTo(User);

module.exports = PostComment; 