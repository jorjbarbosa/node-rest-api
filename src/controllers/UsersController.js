const bcrypt = require('bcryptjs');
const User = require('../models/User');
class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
    const user = await User.create();
  }
  async read(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = new UserController();
