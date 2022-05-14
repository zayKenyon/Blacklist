const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
	guild: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('blacklist', schema);