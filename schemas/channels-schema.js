const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	guildID: {
		type: String,
		required: true,
	},
	channelID: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('channel', schema);