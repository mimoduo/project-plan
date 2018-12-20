var Project = require('../models/project.js');
var Board = require('../models/project-board.js');
var Column = require('../models/project-column.js');
var Card = require('../models/project-card.js');

exports.projectGet = function (req, res, next) {
	Project.findById(req.params.id).populate({
		path: 'boards',
		populate: {
			path: 'columns',
			populate: {
				path: 'cards'
			}
		}
	}).exec(function (err, project) {
		res.render('project', {
			project: project
		});
	});
};

exports.projectPost = function (req, res, next) {
	if (req.body.action == "change-project-title") {
		Project.findById(req.body.project, function (err, project) {
			project.title = req.body.title;

			project.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				project: project._id,
				title: project.title
			});
		});
	}

	if (req.body.action == "change-target-hours") {
		Project.findById(req.body.project, function (err, project) {
			project.points.target = req.body.targetHours;

			project.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				project: project._id,
				title: project.title
			});
		});
	} 
	
	if(req.body.action == "create-board") {
		Project.findById(req.body.project, function (err, project) {
			var newBoard = new Board({
				project: project._id,
				title: 'Casino Royale'
			});

			newBoard.save(function (err) {
				if (err) return handleError(err);
			});

			project.boards.push(newBoard._id);
			project.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				project: project._id,
				board: newBoard._id
			});
		});
	}

	if (req.body.action == "change-board-title") {
		Board.findById(req.body.board, function (err, board) {
			board.title = req.body.title;

			board.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				board: board._id,
				title: board.title
			});
		});
	} 
	
	if (req.body.action == "create-column") {
		Board.findById(req.body.board, function (err, board) {
			var newColumn = new Column({
				board: board._id
			});

			newColumn.save(function (err) {
				if (err) return handleError(err);
			});

			board.columns.push(newColumn._id);
			board.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				board: board._id,
				column: newColumn._id
			});
		});
	} 

	if (req.body.action == "change-column-title") {
		Column.findById(req.body.column, function (err, column) {
			column.title = req.body.title;

			column.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				column: column._id,
				title: column.title
			});
		});
	} 
	
	if (req.body.action == "create-card") {
		Column.findById(req.body.column, function (err, column) {
			var newCard = new Card({
				column: column._id,
				type: "none",
				title: ""
			});

			column.cards.push(newCard._id);
			column.save(function (err) {
				if (err) return handleError(err);
			});

			newCard.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				column: column._id,
				card: newCard._id
			});
		});
	} 
	
	if (req.body.action == "delete-card") {
		Card.deleteOne({
			_id: req.body.card
		}, function (err) {
			if (err) return handleError(err);

			res.send({
				deleted: true
			});
		});
	} 

	if (req.body.action == "change-card-title") {
		Card.findById(req.body.card, function (err, card) {
			card.title = req.body.title;

			card.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				card: card._id,
				title: card.title
			});
		});
	}
	
	if (req.body.action == "flip-linked") {
		Card.findById(req.body.card, function (err, card) {
			card.linked = req.body.linked == "false" ? true : false;

			card.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				card: card._id,
				linked: card.linked
			});
		});
	} 
	
	if (req.body.action == "flip-type") {
		Card.findById(req.body.card, function (err, card) {
			card.type = req.body.type == "none" ? "approved" : "none";

			card.save(function (err) {
				if (err) return handleError(err);
			});

			res.send({ 
				card: card._id,
				type: card.type
			});
		});
	}

	Project.findById(req.path.replace('/', ''), function (err, project) {
		project.lastUpdated = new Date();

		project.save(function (err) {
			if (err) return handleError(err);
		});
	});
};