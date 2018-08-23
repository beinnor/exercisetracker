const express = require('express');
const router = express.Router();

// Require controller modules.
const userController = require('../controllers/userController');
const exerciseController = require('../controllers/exerciseController');

/* POST , add user. */
router.post('/new-user', userController.userAdd);

/* POST add exercise. */
router.post('/add', exerciseController.exerciseAdd);

module.exports = router;
