var Project = require('../models/project.js');

exports.index = function(req, res, next) {
	Project.find({}, 'title')
		.exec(function (err, projects) {
			if (err) { 
				return next(err); 
			}
			
			res.render('', {
				projects: projects
			});
		});
};

exports.createProjectPost = function(req, res, next) {
	Project.create({ 
		title: 'A New Project',
		points: {
			target: 0
		} 
	}, function (err) {
		if (err) return handleError(err);

		res.end();
	});
};