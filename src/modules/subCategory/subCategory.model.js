const mongoose = require('mongoose');

const SubCategory = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    categoryId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('SubCategory', SubCategory);
