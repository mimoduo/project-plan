var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = Schema({
	project: {
		type: Schema.Types.ObjectId, 
		ref: 'Project',
		required: true
	},
	title: String,
	columns: [{
		type: Schema.Types.ObjectId,
		ref: 'Column'
	}]
});

module.exports = mongoose.model('Board', BoardSchema);