const Sequelize = require('sequelize');

const database = require('../config/database');

const Channel = require('./3-channel');

const Playlist = database.define('playlist', {
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
	description: {
		type: Sequelize.TEXT
	}

});

// Relationships
Channel.hasMany(Playlist);
Playlist.belongsTo(Channel);

module.exports = Playlist; 