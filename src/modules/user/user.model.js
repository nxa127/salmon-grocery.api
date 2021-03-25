const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, reuqire: true },
    address: String,
    phone: String,
    avatar: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', User);
