const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscribtionSchema = new Schema({
	channel: {
		type:Schema.Types.ObjectId,
		ref:'channel'
	},
	user:{
		type:Schema.Types.ObjectId,
		ref:'user'
	}
});

const Subscribtion = mongoose.model('subscribtion',SubscribtionSchema);

module.exports = Subscribtion; 