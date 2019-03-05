const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qubUsers', { useNewUrlParser: true }, (err) => {
  if (err) throw new Error(err);
  console.log('Database connected'); //eslint-disable-line
});

module.exports = mongoose;