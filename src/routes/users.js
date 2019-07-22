const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.get('/', UsersController.read);
router.post('/', UsersController.create);
module.exports = router;
