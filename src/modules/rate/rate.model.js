const mongoose = require('mongoose');

const Rate = new mongoose.Schema(
  {
    productId: { type: mongoose.Types.ObjectId, require: true },
    userId: { type: mongoose.Types.ObjectId, require: true },
    rate: { type: Number, require: true, min: 0, max: 5 },
    comment: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Rate', Rate);
