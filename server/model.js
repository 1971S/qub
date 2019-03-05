const db = require('./db');

const userSchema = new db.Schema({
  mail: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  }
});

module.exports = db.model('User', userSchema);