//helper 
const uppercaseFirst = str => `${str[0].toUpperCase}${str.substr(1)}`

const {Sequelize, Model } = require('sequelize');

const database = require('../config/database');
const User = require('./1-user');
const Video = require('./5-video');
const Post = require('./7-post');

class Like extends Sequelize {
	getLiketable(options) {
		if(!this.liketableType) return Promise.resolve(null);
		const mixinMethodName = `get${uppercaseFirst(this.liketableType)}`;
		return this[mixinMethodName](options);
	}
}

 Like = database.define('likes', {

	liketableId : {
		type: Sequelize.INTEGER,
	},
	liketableType : {
		type: Sequelize.STRING,
	}
});

User.hasMany(Like);
Like.belongsTo(User);


Video.hasMany(Like , {
	forieginKey: 'liketableId',
	constraints: false,
	scope: {
		liketableType: 'video',
	}
});

Like.belongsTo(Video,{forieginKey: 'liketableId',constraints: false});


Post.hasMany(Like , {
	forieginKey: 'liketableId',
	constraints: false,
	scope: {
		liketableType: 'post',
	}
});

Like.belongsTo(Post,{forieginKey: 'liketableId',constraints: false});

module.exports = Like; 