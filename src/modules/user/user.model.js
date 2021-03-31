const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, reuqire: true, unique: true },
    address: String,
    phone: { type: String, unique: true },
    avatar: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', User);
