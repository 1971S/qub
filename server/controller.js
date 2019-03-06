const User = require('./model');

exports.getAll = async (req, res) => {

  try {
    const users = await User.find();
    res.status(200);
    res.send(users);
  } catch (e) {
    res.status(400);
    res.send(err);
  }

};

exports.postOne = async (req, res) => {

  try {
    const user = await User.create(req.body);
    res.status(201);
    res.send(user);
  } catch (e) {
    res.status(400);
    res.send(err);
  }

};
