var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	title: String,
	lastUpdated: {
		type: Date,
		default: Date.now
	},
	points: {
		target: {
			type: Number,
			default: 0
		},
		current: {
			type: Number,
			default: 0
		}
	},
	boards: [{
		type: Schema.Types.ObjectId, 
		ref: 'Board'
	}]
});

ProjectSchema.virtual('url').get(function() {
	return '/project/' + this._id;
});

module.exports = mongoose.model('Project', ProjectSchema);