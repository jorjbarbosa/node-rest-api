const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.get('/', UsersController.read);
router.get('/:id', UsersController.readSingle);
router.post('/', UsersController.create);
module.exports = router;
