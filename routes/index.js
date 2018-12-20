var express = require('express');
var projectController = require('../controllers/project-list.js');
var router = express.Router();

router.get('/', projectController.index);
router.post('/', projectController.createProjectPost);

module.exports = router;
