var express = require('express');
var projectController = require('../controllers/project.js');
var router = express.Router();

router.get('/:id', projectController.projectGet);
router.post('/:id', projectController.projectPost);

module.exports = router;
