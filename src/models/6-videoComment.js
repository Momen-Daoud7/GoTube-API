const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Video = require('./5-video');

const VideoComment = database.define('video_comments', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	comment: {
		type: Sequelize.STRING,
		allowNull: false,
	},

});

// Relationship
User.hasMany(VideoComment);
VideoComment.belongsTo(User);
Video.hasMany(VideoComment);
VideoComment.belongsTo(Video);

module.exports = VideoComment; 