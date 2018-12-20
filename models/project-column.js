var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColumnSchema = Schema({
	board: {
		type: Schema.Types.ObjectId, 
		ref: 'Board',
		required: true
	},
	title: String,
	cards: [{
		type: Schema.Types.ObjectId,
		ref: 'Card'
	}]
});

module.exports = mongoose.model('Column', ColumnSchema);