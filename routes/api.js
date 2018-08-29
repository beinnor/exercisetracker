const express = require('express');
const router = express.Router();

// Require controller modules.
const userController = require('../controllers/userController');
const exerciseController = require('../controllers/exerciseController');

/* POST , add user. */
router.post('/new-user', userController.userAdd);

/* GET list all users. */
router.get('/users', userController.listUsers);

/* POST add exercise. */
router.post('/add', exerciseController.exerciseAdd);

module.exports = router;
