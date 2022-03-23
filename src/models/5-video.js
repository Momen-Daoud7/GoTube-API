const Sequelize = require('sequelize');

const database = require('../config/database');

const Channel = require('./3-channel');
const Playlist = require('./4-playlist');

const Video = database.define('videos', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT
	},
	image: {
		type: Sequelize.STRING,
		allowNull:false
	}

});

// Relationships
Channel.hasMany(Video);
Video.belongsTo(Channel);
Playlist.hasMany(Video);
Video.belongsTo(Playlist)

module.exports = Video; 