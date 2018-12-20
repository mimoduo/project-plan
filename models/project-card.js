var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = Schema({
	column: {
		type: Schema.Types.ObjectId,
		ref: 'Column'
	},
	type: String,
	title: String,
	linked: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Card', CardSchema);