const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.get('/', UsersController.read);
router.get('/:id', UsersController.readSingle);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);
module.exports = router;
