const User = require('./model');

exports.getAll = async (req, res) => {

  try {
    const events = await Event.find();
    res.status(200);
    res.send(events);
  } catch (e) {
    res.status(400);
    res.send(err);
  }

};

exports.postOne = async (req, res) => {

  try {
    const event = await Event.create(req.body);
    res.status(201);
    res.send(event);
  } catch (e) {
    res.status(400);
    res.send(err);
  }

};