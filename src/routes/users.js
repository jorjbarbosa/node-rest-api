const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');

router.get('/', (req, res) => {
  return res.send('Users Route');
});
router.post('/', UserController.create);
module.exports = router;
