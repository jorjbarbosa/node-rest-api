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
  async readSingle(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        res.status(400).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error.message);
      if (error.kind == 'ObjectId') {
        return res.status(400).json({
          msg: 'Profile not Found'
        });
      }
      res.status(500).send('Server Error');
    }
  }
  async update(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOneAndUpdate({ _id: id }, req.body);
      res.json(user);
    } catch (error) {
      console.error(error.message);
      if (error.kind == 'ObjectId') {
        return res.status(400).json({
          msg: 'Profile not Found'
        });
      }
      res.status(500).send('Server Error');
    }
  }
}

module.exports = new UserController();
